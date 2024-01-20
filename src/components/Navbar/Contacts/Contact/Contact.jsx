import { LogOut, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { removeContact } from '../../../../redux/slices/contactSlice'
import { kickMember } from '../../../../redux/slices/groupSlice'
import { parseLongNick } from '../../../../utils/parseNick'
import { Avatar } from '../../../Avatar/Avatar'
import { LoginTag } from '../../../LoginTag/LoginTag'
import { RoundButton } from '../../../RoundButton/RoundButton'
import s from './Contact.module.scss'

export const Contact = ({ contact, type, group }) => {
  const { login, nickname, avatarPicture } = contact
  const parsedNick = parseLongNick(nickname)
  const dispatch = useDispatch()

  const handleRemoveContact = (contactId) => {
    dispatch(removeContact(contactId))
  }
  const handleKickContact = (memberId) => {
    dispatch(kickMember({ groupId: group._id, memberId }))
      .unwrap()
      .then((payload) => toast.success('User was kicked'))
      .catch((error) => toast.error(error.message))
  }
  return (
    <div
      className={`${s.contact} ${
        type === 'list' ? `${s.list}` : type === 'admin' ? `${s.admin}` : ''
      }`}>
      <Avatar avatarPicture={avatarPicture} id={contact._id} />
      <div className={s.nameAndId}>
        <h3>{parsedNick}</h3>
        <LoginTag>{login}</LoginTag>
      </div>
      <button
        type="button"
        className={`${s.removeBtn}`}
        onClick={
          type !== 'list' && type !== 'admin' ? () => handleRemoveContact(contact._id) : null
        }>
        <Trash2 />
      </button>
      {type === 'admin' && contact._id !== group.admin && (
        <RoundButton onClick={() => handleKickContact(contact._id)}>
          <LogOut color="#707579" />
        </RoundButton>
      )}
    </div>
  )
}
