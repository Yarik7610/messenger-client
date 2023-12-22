import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { useSocket } from '../../../../contexts/SocketProvider'
import { exitGroup } from '../../../../redux/slices/groupSlice'
import { parseNick } from '../../../../utils/parseNick'
import s from './Group.module.scss'

const isActive = ({ isActive }) => (isActive ? `${s.li} ${s.active}` : `${s.li}`)

export const Group = ({ group }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const { _id, name, members } = group
  const [unreadMessagesAmount, setUnreadMessagesAmount] = useState(0)
  const { socket } = useSocket()
  const parsedGroupName = parseNick(name)
  const auth = useSelector((state) => state.auth)

  const handleRemoveGroup = (e, groupId) => {
    e.preventDefault()
    dispatch(exitGroup(groupId))
    socket.emit('leaveRoom', groupId)
  }

  const handleRedirect = () => {
    if (socket) socket.emit('resetUsersUnreadGroupMessages', _id)
    setUnreadMessagesAmount(0)
  }

  useEffect(() => {
    if (socket && _id) socket.emit('joinRoom', _id)
    if (socket && members.length > 0 && _id) {
      const membersIds = members.map((m) => m._id)
      socket.emit('pushGroupMembers', { groupId: _id, membersIds })
    }

    const handleGetUsersUnreadGroupMessages = (groupAmounts) => {
      setUnreadMessagesAmount(groupAmounts[auth._id]['value'])
    }

    if (socket && group) socket.on('getUsersUnreadGroupMessages', handleGetUsersUnreadGroupMessages)
    return () => {
      if (socket) socket.off('getUsersUnreadGroupMessages', handleGetUsersUnreadGroupMessages)
    }
  }, [socket, params.groupId])

  return (
    <NavLink to={`/chat/${_id}`} className={isActive} onClick={handleRedirect}>
      <li className={s.content}>
        <div className={s.left}>
          <h3>{parsedGroupName}</h3>
          {unreadMessagesAmount > 0 && (
            <div className={s.unreadMsgAmount}>{unreadMessagesAmount}</div>
          )}
        </div>
        <button className={s.removeBtn} onClick={(e) => handleRemoveGroup(e, _id)}>
          <LogOut />
        </button>
      </li>
    </NavLink>
  )
}
