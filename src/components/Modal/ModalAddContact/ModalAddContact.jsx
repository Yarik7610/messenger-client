import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addContact } from '../../../redux/slices/contactSlice'
import { BlueButton } from '../../BlueButton/BlueButton'
import s from './ModalAddContact.module.scss'

export const ModalAddContact = () => {
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.auth)
  const { contacts } = useSelector((state) => state.contact)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })
  const onSubmit = (data) => {
    if (data.contactId === _id) {
      toast.error("Can't add yourself")
      return
    }
    if (contacts.some((c) => c._id === data.contactId)) {
      toast.error("Can't add your contact second time")
      return
    }
    dispatch(addContact(data))
    toast.success('Contact was added')
    reset()
  }
  return (
    <div className={s.wrap}>
      <h2>Add contact</h2>
      <div className={s.formWrap}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={`${s.group} ${errors.contactId ? `${s.error}` : ''}`}>
            <input
              type="text"
              className={`${s.input} ${errors.contactId ? `${s.error}` : ''}`}
              {...register('contactId', {
                required: 'This field is required'
              })}
              required
            />
            <label className={`${s.label} ${errors.contactId ? `${s.error}` : ''}`}>Id</label>
          </div>
          {errors.contactId && <div className={s.errorMessage}>{errors.contactId.message}</div>}
          <BlueButton>Next</BlueButton>
        </form>
      </div>
    </div>
  )
}
