import { SendHorizontal } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { instance } from '../../../../api/axios'
import { RoundButton } from '../../../../components/RoundButton/RoundButton'
import s from './ChatInput.module.scss'

export const ChatInput = ({ groupId, setMessages }) => {
  const { _id } = useSelector((state) => state.auth)
  const [value, setValue] = useState('')
  const textAreaRef = useRef(null)

  const handleInput = (e) => {
    textAreaRef.current.style.height = '50px'
    textAreaRef.current.style.height = `${e.target.scrollHeight - 16}px`
  }
  const onMessageSend = async () => {
    if (!value) return
    const newMessage = {
      text: value,
      sender: _id,
      groupId: groupId
    }
    const response = await instance.post('/message', newMessage)
    setMessages((prevMessages) => {
      return [...prevMessages, response.data]
    })
    setValue('')
  }
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
}
