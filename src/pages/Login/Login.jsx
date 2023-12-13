import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { BlueButton } from '../../components/BlueButton/BlueButton'
import { loginUser } from '../../redux/slices/authSlice'
import s from './Login.module.scss'

export const Login = () => {
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const onSubmit = async (data) => {
    await dispatch(loginUser(data))
    navigate('/')
    reset()
  }
  return (
    <>
      <div className={s.wrap}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <h1>Messenger</h1>
          <h2 className={s.title}>Log in</h2>

          <div className={`${s.group} ${errors.nickname ? `${s.error}` : ''}`}>
            <input
              type="text"
              className={`${s.input} ${errors.nickname ? `${s.error}` : ''}`}
              {...register('nickname', {
                required: 'This field is required',
                validate: (value) => value.trim() !== '' || 'No white spaces',
                minLength: { value: 1, message: 'Min length is 1 symbol' },
                maxLength: { value: 50, message: 'Max length was achieved' }
              })}
              required
            />
            <label className={`${s.label} ${errors.nickname ? `${s.error}` : ''}`}>Nickname</label>
          </div>
          {errors.nickname && <div className={s.errorMessage}>{errors.nickname.message}</div>}

          <div className={`${s.group} ${s.passwordGroup} ${errors.password ? `${s.error}` : ''}`}>
            <input
              type={isVisible ? 'text' : 'password'}
              className={`${s.input} ${errors.password ? `${s.error}` : ''}`}
              {...register('password', {
                required: 'This field is required',
                validate: (value) => value.trim() !== '' || 'No white spaces',
                maxLength: { value: 50, message: 'Max length was achieved' },
                minLength: { value: 6, message: 'Min length is 6 chars' }
              })}
              required
            />
            <label className={`${s.label} ${errors.password ? `${s.error}` : ''}`}>
              Enter Your Password
            </label>
            <div className={s.formEye}>
              {!isVisible ? (
                <Eye color="#39c" onClick={() => setIsVisible(true)} />
              ) : (
                <EyeOff color="#39c" onClick={() => setIsVisible(false)} />
              )}
            </div>
          </div>
          {errors.password && <div className={s.errorMessage}>{errors.password.message}</div>}
          <BlueButton>Next</BlueButton>
          <div className={s.alternativeDiv}>
            Don't have an account?{' '}
            <span>
              <NavLink to="/signup">Sign up</NavLink>
            </span>
          </div>
        </form>
      </div>
    </>
  )
}
