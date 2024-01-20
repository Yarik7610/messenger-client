import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { changeAdmin } from '../../../redux/slices/groupSlice'
import { BlueButton } from '../../BlueButton/BlueButton'
import { Contact } from '../../Navbar/Contacts/Contact/Contact'
import { Search } from '../../Search/Search'
import s from './ModalChangeAdmin.module.scss'

export const ModalChangeAdmin = ({ setIsOpened, group }) => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      member: ''
    }
  })

  const onSubmit = (data) => {
    dispatch(changeAdmin({ member: data.member, groupId: group._id }))
      .unwrap()
      .then((payload) => toast.success('Admin changed'))
      .catch((error) => toast.error(error.message))
    setIsOpened(false)
    reset()
  }

  const membersWithoutCurrentAdmin = group.members.filter((m) => m._id !== group.admin)
  const filteredMembers = membersWithoutCurrentAdmin.filter(
    (m) =>
      m.nickname.toLowerCase().includes(query.toLowerCase()) ||
      m.login.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className={s.wrap}>
      <h3>Choose new admin:</h3>
      <div className={s.formWrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Search query={query} setQuery={setQuery} />
          <ul className={`${s.checkboxList} ${errors.member ? `${s.error}` : ''}`}>
            {filteredMembers.map((m) => (
              <li key={m._id} className={s.memberWrap}>
                <label className={s.checkboxOption}>
                  <Contact contact={m} type="list" />
                  <input
                    {...register('member', { required: '1 member is required' })}
                    type="radio"
                    value={m._id}
                  />
                </label>
              </li>
            ))}
          </ul>
          {errors.member && <div className={s.errorMessage}>{errors.member.message}</div>}
          <div className={s.btnWrap}>
            <BlueButton>Next</BlueButton>
          </div>
        </form>
      </div>
    </div>
  )
}
