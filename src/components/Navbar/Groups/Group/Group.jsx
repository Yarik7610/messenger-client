import { LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { exitGroup } from '../../../../redux/slices/groupSlice'
import { parseNick } from '../../../../utils/parseNick'
import s from './Group.module.scss'

const isActive = ({ isActive }) => (isActive ? `${s.li} ${s.active}` : `${s.li}`)

export const Group = ({ group }) => {
  const dispatch = useDispatch()
  const { _id, name } = group

  const parsedGroupName = parseNick(name)
  // const parsedLastSender = parseLastSender(lastSender)
  // const parsedLastMessage = parseLastMessage(lastMessage)

  const handleRemoveGroup = (e, groupId) => {
    e.preventDefault()
    dispatch(exitGroup(groupId))
  }

  return (
    <NavLink to={`/${_id}`} className={isActive}>
      <h3>{parsedGroupName}</h3>
      {/* <div className={s.lastMessage}>
        <span className={s.lastSender}>{parsedLastSender}: </span>
        <span>{parsedLastMessage}</span>
      </div> */}
      {/* <div className={s.lastTime}>{lastTime}</div> */}
      <button className={s.removeBtn} onClick={(e) => handleRemoveGroup(e, _id)}>
        <LogOut />
      </button>
    </NavLink>
  )
}
