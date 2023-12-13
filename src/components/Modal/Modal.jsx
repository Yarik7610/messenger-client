import { X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { RoundButton } from '../RoundButton/RoundButton'
import s from './Modal.module.scss'

export const Modal = ({ setIsOpened, children, height, width }) => {
  const modalRef = useRef(null)
  useEffect(() => {
    document.body.classList.add('activeModal')
    const handleClickOutside = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setIsOpened(false)
      }
    }
    document.body.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.body.classList.remove('activeModal')
      document.body.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={s.wrap}>
      <div ref={modalRef} className={s.modal} style={{ height: `${height}`, width: `${width}` }}>
        {children}
        <div className={s.btnWrap}>
          <RoundButton onClick={() => setIsOpened(false)}>
            <X color="#39c" />
          </RoundButton>
        </div>
      </div>
    </div>
  )
}
