import { SendHorizontal } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useSelector } from 'react-redux'
import { instance } from '../../../../api/axios'
import { RoundButton } from '../../../../components/RoundButton/RoundButton'
import { useSocket } from '../../../../contexts/SocketProvider'
import s from './ChatInput.module.scss'

export const ChatInput = forwardRef(({ groupId, setMessages }, ref) => {
  const { _id } = useSelector((state) => state.auth)
  const [value, setValue] = useState('')
  const textAreaRef = useRef(null)
  const { socket } = useSocket()

  useEffect(() => {
    if (groupId && value) setValue('')
  }, [groupId])

  const handleInput = (e) => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = `${e.target.scrollHeight}px`
  }

  const onMessageSend = async () => {
    if (!value.trim()) return
    let trimmedLinebreakValue = value.replace(/^\s+|\s+$/g, '')
    const newMessage = {
      text: trimmedLinebreakValue,
      sender: _id,
      groupId: groupId
    }
    const response = await instance.post('/message', newMessage)
    if (socket) socket.emit('sendNewMessage', { message: response.data, groupId, senderId: _id })
    textAreaRef.current.style.height = 'auto'
    setValue('')
  }

  useEffect(() => {
    const handleGetNewMessage = (data) => {
      if (groupId === data.groupId) {
        flushSync(() =>
          setMessages((prevMessages) => {
            return [...prevMessages, data.message]
          })
        )
        ref.current.querySelector('ul').lastChild.scrollIntoView({ block: 'end' })
      }
    }
    if (socket) socket.on('getNewMessage', handleGetNewMessage)
    return () => {
      if (socket) socket.off('getNewMessage', handleGetNewMessage)
    }
  }, [socket, groupId])

  return (
    <div className={s.wrap}>
      <textarea
        ref={textAreaRef}
        className={s.textarea}
        onInput={handleInput}
        placeholder="Send message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={s.right}>
        <RoundButton onClick={onMessageSend}>
          <SendHorizontal color="#39c" />
        </RoundButton>
      </div>
    </div>
  )
})
