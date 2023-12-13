import { MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { instance } from '../../../api/axios'
import { Modal } from '../../../components/Modal/Modal'
import { ModalGroupMembers } from '../../../components/Modal/ModalGroupMembers/ModalGroupMembers'
import { RoundButton } from '../../../components/RoundButton/RoundButton'
import s from './Chat.module.scss'
import { ChatInput } from './ChatInput/ChatInput'
import { ChatMessages } from './ChatMessages/ChatMessages'

export const Chat = () => {
  const params = useParams()
  const groupId = params.groupId
  const [messages, setMessages] = useState([])
  const [members, setMembers] = useState([])
  const [isModalOpened, setIsModalOpened] = useState(false)

  const { groups } = useSelector((state) => state.group)
  const group = groups.find((g) => g._id === groupId)

  const handleModal = () => {
    setIsModalOpened(!isModalOpened)
  }
  useEffect(() => {
    const fetchMessagesAndMembers = async () => {
      const response = await instance.get(`/message/${groupId}`)
      setMessages(response.data)
    }
    fetchMessagesAndMembers()
  }, [groupId])

  if (!group) return <></>
  return (
    <main className={s.grid}>
      <div className={s.header}>
        <NavLink to={'/'}>
          <RoundButton>
            <MoveLeft color="#707579" />
          </RoundButton>
        </NavLink>
        <div className={s.groupNameDiv} onClick={handleModal}>
          <div>{group.name}</div>
          <span>{group.members.length} members</span>
          {/* <div className={s.status}>Online</div> */}
        </div>
      </div>
      <ChatMessages messages={messages} />
      <ChatInput groupId={groupId} setMessages={setMessages} />
      {isModalOpened && (
        <Modal setIsOpened={setIsModalOpened} width={'400px'}>
          <ModalGroupMembers members={group.members} />
        </Modal>
      )}
    </main>
  )
}
