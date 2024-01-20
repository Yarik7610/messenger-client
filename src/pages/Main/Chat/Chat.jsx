import { MoveLeft, UserCog, UserPlus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { instance } from '../../../api/axios'
import { MiddleMessage } from '../../../components/MiddleMessage/MiddleMessage'
import { Modal } from '../../../components/Modal/Modal'
import { ModalAddMembers } from '../../../components/Modal/ModalAddMembers/ModalAddMembers'
import { ModalChangeAdmin } from '../../../components/Modal/ModalChangeAdmin/ModalChangeAdmin'
import { ModalGroupMembers } from '../../../components/Modal/ModalGroupMembers/ModalGroupMembers'
import { RoundButton } from '../../../components/RoundButton/RoundButton'
import { useSocket } from '../../../contexts/SocketProvider'
import s from './Chat.module.scss'
import { ChatInput } from './ChatInput/ChatInput'
import { ChatMessages } from './ChatMessages/ChatMessages'

export const Chat = () => {
  const { groupId } = useParams()
  const [messages, setMessages] = useState([])
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalNumber, setModalNumber] = useState(0)
  const [page, setPage] = useState(0)
  const [isFetching, setIsFetching] = useState(true)
  const scrollRef = useRef(null)
  const { socket } = useSocket()
  const { groups } = useSelector((state) => state.group)
  let group = groups.find((g) => g._id === groupId)
  const auth = useSelector((state) => state.auth)
  const handleModal = (modalNumber) => {
    setIsModalOpened(!isModalOpened)
    setModalNumber(modalNumber)
  }

  useEffect(() => {
    const fetchMessagesAmount = async () => {
      if (group && socket) {
        try {
          const response = await instance.get(`/message/${groupId}/amount`)
          setPage(Math.ceil(response.data / 50))
          setMessages([])
          setIsFetching(true)
        } catch (e) {
          console.log(e.message)
        }
      }
    }
    fetchMessagesAmount()
  }, [group, socket])

  useEffect(() => {
    const fetchMessages = async () => {
      if (group && socket && isFetching && page && groupId) {
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
    if (messages.length > 0 && messages.length < 10 && page > 0) setIsFetching(true)
    if (group && socket) {
      socket.emit('resetUsersUnreadGroupMessages', groupId)
      socket.emit('setReadUser', groupId)
    }
    return () => {
      if (group && socket) socket.emit('unsetReadUser', groupId)
    }
  }, [group, socket, isFetching, page, messages, groupId])

  let privateMemberNickname = null
  if (group && auth) {
    if (group.type === 'private' && group.members.length < 2) privateMemberNickname = auth.nickname
    else if (group.type === 'private' && group.members.length === 2)
      privateMemberNickname = group.members.find((m) => m._id !== auth._id).nickname
  }

  if (!group) return <MiddleMessage>No such chat</MiddleMessage>
  return (
    <main className={s.grid}>
      <div className={s.header}>
        <NavLink to={'/'}>
          <RoundButton>
            <MoveLeft color="#707579" />
          </RoundButton>
        </NavLink>
        <div className={s.groupNameDiv} onClick={() => handleModal(0)}>
          <div>{group.type !== 'private' ? group.name : privateMemberNickname}</div>

          <span>
            {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
          </span>
        </div>
        <div className={s.right}>
          {group.type !== 'private' && group.admin === auth._id && (
            <RoundButton onClick={() => handleModal(1)}>
              <UserCog color="#707579" />
            </RoundButton>
          )}
          {group.type !== 'private' && (
            <RoundButton onClick={() => handleModal(2)}>
              <UserPlus color="#707579" />
            </RoundButton>
          )}
        </div>
      </div>
      <ChatMessages
        ref={scrollRef}
        groupId={groupId}
        messages={messages}
        page={page}
        setIsFetching={setIsFetching}
      />
      <ChatInput ref={scrollRef} groupId={groupId} setMessages={setMessages} />
      {isModalOpened && (
        <Modal setIsOpened={setIsModalOpened} width={'400px'}>
          {modalNumber === 0 ? (
            <ModalGroupMembers group={group} />
          ) : modalNumber === 1 ? (
            <ModalChangeAdmin setIsOpened={setIsModalOpened} group={group} />
          ) : (
            <ModalAddMembers group={group} />
          )}
        </Modal>
      )}
    </main>
  )
}
