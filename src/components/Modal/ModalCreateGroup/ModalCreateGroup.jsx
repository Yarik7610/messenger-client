import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createGroup } from '../../../redux/slices/groupSlice'
import { BlueButton } from '../../BlueButton/BlueButton'
import s from './ModalCreateGroup.module.scss'

export const ModalCreateGroup = () => {
  const { contacts } = useSelector((state) => state.contact)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const onSubmit = (data) => {
    if (!data.members) {
      toast.error("Can't create empty group, add contacts")
      return
    }
    if (data.members && data.members.length === 0) {
      toast.error("Can't create empty group, choose contacts")
      return
    }
    dispatch(createGroup(data))
    toast.success('Group was created')
    reset()
  }

  return (
    <div className={s.wrap}>
      <h2>Create group</h2>
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

          <ul className={`${s.checkboxList} ${errors.members ? `${s.error}` : ''}`}>
            {contacts.map((c) => (
              <li key={c._id}>
                <label className={`${s.checkboxOption}`}>
                  <input
                    {...register('members', { required: 'At least 1 checkbox is required' })}
                    type="checkbox"
                    value={c._id}
                  />
                  <span>{c.nickname}</span>
                </label>
              </li>
            ))}
          </ul>
          {errors.members && <div className={s.errorMessage}>{errors.members.message}</div>}
          <BlueButton>Next</BlueButton>
        </form>
      </div>
    </div>
  )
}
