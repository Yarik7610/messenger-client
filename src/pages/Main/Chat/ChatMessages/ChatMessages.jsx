import { useEffect, useRef } from 'react'
import { MiddleMessage } from '../../../../components/MiddleMessage/MiddleMessage'
import { ChatMessage } from './ChatMessage/ChatMessage'
import s from './ChatMessages.module.scss'

export const ChatMessages = ({ messages }) => {
  const ulRef = useRef()

  useEffect(() => {
    if (messages.length > 0) ulRef.current.lastChild.scrollIntoView({ block: 'end' })
  }, [messages])

  return (
    <div className={s.messagesWrap}>
      {messages.length === 0 ? (
        <MiddleMessage>No messages yet</MiddleMessage>
      ) : (
        <ul ref={ulRef} className={s.messages}>
          {messages.map((m, i) => (
            <ChatMessage key={i} data={m} />
          ))}
        </ul>
      )}
    </div>
  )
}
