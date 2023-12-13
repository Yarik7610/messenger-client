import { forwardRef } from 'react'
import s from './RoundButton.module.scss'

export const RoundButton = forwardRef(({ children, onClick }, ref) => {
  return (
    <button className={s.btn} ref={ref ? ref : null} onClick={onClick ? onClick : undefined}>
      {children}
    </button>
  )
})
