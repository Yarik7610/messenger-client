import { MoveLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { instance } from '../../../api/axios'
import { MiddleMessage } from '../../../components/MiddleMessage/MiddleMessage'
import { Modal } from '../../../components/Modal/Modal'
import { ModalGroupMembers } from '../../../components/Modal/ModalGroupMembers/ModalGroupMembers'
import { RoundButton } from '../../../components/RoundButton/RoundButton'
import { useSocket } from '../../../contexts/SocketProvider'
import s from './Chat.module.scss'
import { ChatInput } from './ChatInput/ChatInput'
import { ChatMessages } from './ChatMessages/ChatMessages'

export const Chat = () => {
  const params = useParams()
  const [messages, setMessages] = useState([])
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [page, setPage] = useState(0)
  const [isFetching, setIsFetching] = useState(true)
  const scrollRef = useRef()
  const { socket } = useSocket()

  const groupId = params.groupId
  const { groups } = useSelector((state) => state.group)
  let group = groups.find((g) => g._id === groupId)

  const handleModal = () => {
    setIsModalOpened(!isModalOpened)
  }

  useEffect(() => {
    const fetchMessagesAmount = async () => {
      if (group && socket) {
        try {
          const response = await instance.get(`/message/${groupId}/amount`)
          setPage(Math.ceil(response.data / 50))
        } catch (e) {
          console.log(e.message)
        }
      }
    }
    fetchMessagesAmount()
  }, [group, socket])

  useEffect(() => {
    const fetchMessages = async () => {
      if (group && isFetching && socket && page) {
        try {
          const response = await instance.get(`/message/${groupId}?page=${page}`)
          setMessages((prevMessages) => [...response.data, ...prevMessages])
          setPage((prevPage) => prevPage - 1)
          setIsFetching(false)
        } catch (e) {
          console.log(e.message)
        }
      }
    }
    fetchMessages()
    if (messages.length > 0 && messages.length < 10) setIsFetching(true)
    if (group && socket) {
      socket.emit('resetUsersUnreadGroupMessages', groupId)
      socket.emit('setReadUser', groupId)
    }
    return () => {
      if (group && socket) socket.emit('unsetReadUser', groupId)
    }
  }, [group, socket, isFetching, page, messages])

  if (!group) return <MiddleMessage>No such group</MiddleMessage>
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
        </div>
      </div>
      <ChatMessages ref={scrollRef} messages={messages} page={page} setIsFetching={setIsFetching} />
      <ChatInput ref={scrollRef} groupId={groupId} setMessages={setMessages} />
      {isModalOpened && (
        <Modal setIsOpened={setIsModalOpened} width={'400px'}>
          <ModalGroupMembers members={group.members} />
        </Modal>
      )}
    </main>
  )
}
