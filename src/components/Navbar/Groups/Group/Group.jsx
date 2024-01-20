import { LogOut, Users as UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSocket } from '../../../../contexts/SocketProvider'
import { exitGroup } from '../../../../redux/slices/groupSlice'
import { parseLongNick, parseNick } from '../../../../utils/parseNick'
import s from './Group.module.scss'

const isActive = ({ isActive }) => (isActive ? `${s.li} ${s.active}` : `${s.li}`)

export const Group = ({ group }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const [unreadMessagesAmount, setUnreadMessagesAmount] = useState(0)
  const { socket } = useSocket()
  const auth = useSelector((state) => state.auth)

  const handleExitFromGroup = (e, groupId) => {
    e.preventDefault()
    if (group.type !== 'private' && group.members.length > 1 && auth._id === group.admin)
      toast.error('You are admin in this chat. Choose another admin first of all')
    else {
      dispatch(exitGroup(groupId))
      socket.emit('leaveRoom', groupId)
    }
  }

  const handleRedirect = () => {
    if (socket) socket.emit('resetUsersUnreadGroupMessages', group._id)
    setUnreadMessagesAmount(0)
  }

  useEffect(() => {
    if (socket && group._id) socket.emit('joinRoom', group._id)
    if (socket && group.members.length > 0 && group._id) {
      const membersIds = group.members.map((m) => m._id)
      socket.emit('pushGroupMembers', { groupId: group._id, membersIds })
    }

    const handleGetUsersUnreadGroupMessages = ({ groupUnreadMessages, groupId }) => {
      if (group._id === groupId) setUnreadMessagesAmount(groupUnreadMessages[auth._id]['value'])
    }

    if (socket && group) socket.on('getUsersUnreadGroupMessages', handleGetUsersUnreadGroupMessages)
    return () => {
      if (socket) socket.off('getUsersUnreadGroupMessages', handleGetUsersUnreadGroupMessages)
    }
  }, [socket, group, params.groupId])

  const privateMember = group.members.find((m) => m._id !== auth._id)
  let privateGroupLogin = null
  let privateGroupName = null
  if (privateMember) privateGroupLogin = privateMember.login
  if (privateMember) privateGroupName = privateMember.nickname
  if (!privateGroupName) privateGroupName = auth.nickname
  if (!privateGroupLogin) privateGroupLogin = auth.login
  let parsedGroupName =
    group.type === 'private' ? parseLongNick(privateGroupName) : parseNick(group.name)

  return (
    <>
      <NavLink to={`/chat/${group._id}`} className={isActive} onClick={handleRedirect}>
        <li className={s.content}>
          <div className={s.left}>
            <h3>
              {group.type !== 'private' && (
                <div>
                  <UsersIcon />
                </div>
              )}
              <div className={s.groupName}>
                {parsedGroupName}
                {group.type === 'private' && privateGroupLogin && (
                  <div className={s.loginTagImitation}>@{privateGroupLogin}</div>
                )}
              </div>
            </h3>
            {unreadMessagesAmount > 0 && (
              <div className={s.unreadMsgAmount}>
                {unreadMessagesAmount >= 1000 ? '999+' : unreadMessagesAmount}
              </div>
            )}
          </div>
          <button className={s.removeBtn} onClick={(e) => handleExitFromGroup(e, group._id)}>
            <LogOut />
          </button>
        </li>
      </NavLink>
    </>
  )
}
