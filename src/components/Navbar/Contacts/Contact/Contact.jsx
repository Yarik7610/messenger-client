import { Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeContact } from '../../../../redux/slices/contactSlice'
import { parseNick } from '../../../../utils/parseNick'
import { Avatar } from '../../../Avatar/Avatar'
import s from './Contact.module.scss'

export const Contact = ({ contact, type }) => {
  const { nickname, avatarPicture, _id } = contact
  const parsedNick = parseNick(nickname)
  const dispatch = useDispatch()
  // const parsedLastMsg = lastMessage.length > 22 ? lastMessage.slice(0, 22) + '...' : lastMessage
  const handleRemoveContact = (contactId) => {
    dispatch(removeContact(contactId))
  }
  return (
    <li className={`${s.li} ${type === 'list' ? `${s.list}` : ''}`}>
      <Avatar avatarPicture={avatarPicture} id={_id} />
      <div className={s.nameAndId}>
        <h3>{parsedNick}</h3>
        <span>
          <span>Id:</span> {_id}
        </span>
      </div>
      <button className={`${s.removeBtn}`} onClick={() => handleRemoveContact(_id)}>
        <Trash2 />
      </button>
    </li>
  )
}
