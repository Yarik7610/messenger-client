import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useSocket } from '../../../contexts/SocketProvider'
import { addMembers } from '../../../redux/slices/groupSlice'
import { BlueButton } from '../../BlueButton/BlueButton'
import { Contact } from '../../Navbar/Contacts/Contact/Contact'
import { Search } from '../../Search/Search'
import s from './ModalAddMembers.module.scss'

export const ModalAddMembers = ({ group }) => {
  const [query, setQuery] = useState('')
  const { socket } = useSocket()
  const dispatch = useDispatch()
  const { contacts } = useSelector((state) => state.contact)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      newMembers: []
    }
  })

  const onSubmit = (data) => {
    if (data.newMembers.length === 0) return
    dispatch(addMembers({ ...data, groupId: group._id }))
      .unwrap()
      .then((payload) => {
        if (socket) socket.emit('addMember', { groupId: group._id, membersIds: data.newMembers })
        toast.success('Added members')
      })
      .catch((error) => {
        toast.error(error.message)
      })
    reset()
  }

  const membersIds = group.members.map((m) => m._id)
  const unaddedContacts = contacts.filter((c) => !membersIds.includes(c._id))
  const filteredContacts = unaddedContacts.filter(
    (c) =>
      c.nickname.toLowerCase().includes(query.toLowerCase()) ||
      c.login.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className={s.wrap}>
      <h3>Add members:</h3>
      <div className={s.formWrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Search query={query} setQuery={setQuery} />
          <ul className={`${s.checkboxList} ${errors.newMembers ? `${s.error}` : ''}`}>
            {filteredContacts.map((c) => (
              <li key={c._id} className={s.memberWrap}>
                <label className={s.checkboxOption}>
                  <Contact contact={c} type="list" />
                  <input
                    {...register('newMembers', { required: 'At least 1 checkbox is required' })}
                    type="checkbox"
                    value={c._id}
                  />
                </label>
              </li>
            ))}
          </ul>
          {errors.newMembers && <div className={s.errorMessage}>{errors.newMembers.message}</div>}
          <div className={s.btnWrap}>
            <BlueButton>Next</BlueButton>
          </div>
        </form>
      </div>
    </div>
  )
}
