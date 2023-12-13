import s from './MenuButton.module.scss'

export const MenuButton = ({ children, onClick, type }) => {
  if (type === 'input') return <label className={s.btn}>{children}</label>
  return (
    <button className={s.btn} onClick={onClick ? onClick : undefined}>
      {children}
    </button>
  )
}
