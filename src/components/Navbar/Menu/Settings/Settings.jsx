import { CircleUser, LogOut, Users as UsersIcon } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from '../../../../contexts/SocketProvider'
import { logout } from '../../../../redux/slices/authSlice'
import { MenuButton } from '../../../MenuButton/MenuButton'
import { Modal } from '../../../Modal/Modal'
import { ModalAddContact } from '../../../Modal/ModalAddContact/ModalAddContact'
import { ModalCreateGroup } from '../../../Modal/ModalCreateGroup/ModalCreateGroup'
import s from './Settings.module.scss'

export const Settings = () => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const dispatch = useDispatch()
  const { socket } = useSocket()

  const handleClick = (index) => {
    setIsModalOpened(true)
    setModalIndex(index)
  }
  const handleLogout = () => {
    dispatch(logout())
    if (socket) socket.disconnect()
  }
  return (
    <>
      <div className={s.wrap}>
        <MenuButton onClick={() => handleClick(0)}>
          <CircleUser strokeWidth="1.25px" /> Add contact
        </MenuButton>
        <MenuButton onClick={() => handleClick(1)}>
          <UsersIcon strokeWidth="1.25px" /> Create chat
        </MenuButton>
        <MenuButton onClick={handleLogout}>
          <LogOut strokeWidth="1.25px" /> Log out
        </MenuButton>
      </div>
      {isModalOpened && (
        <Modal setIsOpened={setIsModalOpened} width="400px" height={modalIndex === 0 && '255px'}>
          {modalIndex === 0 ? <ModalAddContact /> : <ModalCreateGroup />}
        </Modal>
      )}
    </>
  )
}
