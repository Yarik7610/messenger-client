import s from './LoginTag.module.scss'

export const LoginTag = ({ children }) => {
  return <div className={s.login}>@{children}</div>
}
