import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createGroup } from '../../../redux/slices/groupSlice'
import { BlueButton } from '../../BlueButton/BlueButton'
import { Contact } from '../../Navbar/Contacts/Contact/Contact'
import { Search } from '../../Search/Search'
import s from './ModalCreateGroup.module.scss'

export const ModalCreateGroup = () => {
  const { contacts } = useSelector((state) => state.contact)
  const { _id } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      members: []
    }
  })

  const onSubmit = (data) => {
    dispatch(createGroup({ ...data, type: 'public', admin: _id }))
      .then((payload) => toast.success('Chat was created'))
      .catch((error) => toast.error(error.message))
    reset()
  }

  const filteredContacts = contacts.filter(
    (c) =>
      c.nickname.toLowerCase().includes(query.toLowerCase()) ||
      c.login.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className={s.wrap}>
      <h3>Create chat</h3>
      <div className={s.formWrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${s.group} ${errors.name ? `${s.error}` : ''}`}>
            <input
              type="text"
              className={`${s.input} ${errors.name ? `${s.error}` : ''}`}
              {...register('name', {
                required: 'This field is required'
              })}
              required
            />
            <label className={`${s.label} ${errors.name ? `${s.error}` : ''}`}>Name</label>
          </div>
          {errors.name && <div className={s.errorMessage}>{errors.name.message}</div>}
          <Search query={query} setQuery={setQuery} />
          <ul className={`${s.checkboxList} ${errors.members ? `${s.error}` : ''}`}>
            {filteredContacts.map((c) => (
              <li className={s.memberWrap} key={c._id}>
                <label className={s.checkboxOption}>
                  <Contact contact={c} type="list" />
                  <input {...register('members')} type="checkbox" value={c._id} />
                </label>
              </li>
            ))}
          </ul>
          {errors.members && <div className={s.errorMessage}>{errors.members.message}</div>}
          <div className={s.btnWrap}>
            <BlueButton onSubmit={() => handleSubmit(onSubmit)}>Next</BlueButton>
          </div>
        </form>
      </div>
    </div>
  )
}
