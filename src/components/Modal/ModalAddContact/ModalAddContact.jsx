import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addContact } from '../../../redux/slices/contactSlice'
import { createGroup } from '../../../redux/slices/groupSlice'
import { BlueButton } from '../../BlueButton/BlueButton'
import s from './ModalAddContact.module.scss'

export const ModalAddContact = () => {
  const dispatch = useDispatch()
  const { login } = useSelector((state) => state.auth)
  const { contacts } = useSelector((state) => state.contact)
  const { groups } = useSelector((state) => state.group)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })
  const onSubmit = (data) => {
    if (data.contactLogin === login) {
      toast.error("Can't add yourself")
      return
    }
    if (contacts.some((c) => c.login === data.contactLogin)) {
      toast.error("Can't add your contact second time")
      return
    }
    dispatch(addContact(data))
      .unwrap()
      .then((payload) => {
        toast.success('Contact was added')

        if (
          !groups.some(
            (g) =>
              g.type === 'private' &&
              g.members.length === 2 &&
              g.members.find((obj) => obj.login === data.contactLogin) &&
              g.members.find((obj) => obj.login === login)
          )
        )
          dispatch(
            createGroup({
              name: payload.nickname,
              members: [payload._id],
              type: 'private',
              admin: ''
            })
          )
      })
      .catch((error) => {
        toast.error(error.message)
      })
    reset()
  }
  return (
    <div className={s.wrap}>
      <h3>Add contact</h3>
      <div className={s.formWrap}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={`${s.group} ${errors.contactLogin ? `${s.error}` : ''}`}>
            <input
              type="text"
              className={`${s.input} ${errors.contactLogin ? `${s.error}` : ''}`}
              {...register('contactLogin', {
                required: 'This field is required'
              })}
              required
            />
            <label className={`${s.label} ${errors.contactLogin ? `${s.error}` : ''}`}>Login</label>
          </div>
          {errors.contactLogin && (
            <div className={s.errorMessage}>{errors.contactLogin.message}</div>
          )}
          <BlueButton>Next</BlueButton>
        </form>
      </div>
    </div>
  )
}
