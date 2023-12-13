import s from './MiddleMessage.module.scss'

export const MiddleMessage = ({ children }) => {
  return <div className={s.middleMsg}>{children}</div>
}
