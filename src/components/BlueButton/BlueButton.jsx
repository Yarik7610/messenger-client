import s from './BlueButton.module.scss'

export const BlueButton = ({ children }) => {
  return (
    <button type="submit" className={s.btn}>
      {children}
    </button>
  )
}
