import { forwardRef, useEffect, useRef } from 'react'
import s from './Menu.module.scss'
import { Profile } from './Profile/Profile'
import { Settings } from './Settings/Settings'

export const Menu = forwardRef(({ setIsMenuOpened }, ref) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current.contains(e.target) && !ref.current.contains(e.target))
        setIsMenuOpened(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={menuRef} className={s.wrap}>
      <Profile />
      <Settings />
    </div>
  )
})
