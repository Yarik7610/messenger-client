import s from './BlueButton.module.scss'

export const BlueButton = ({ children }) => {
  return <button className={s.btn}>{children}</button>
}
