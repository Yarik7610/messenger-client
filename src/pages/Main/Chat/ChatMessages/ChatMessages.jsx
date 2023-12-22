import { forwardRef, useEffect, useRef } from 'react'
import { MiddleMessage } from '../../../../components/MiddleMessage/MiddleMessage'
import { ChatMessage } from './ChatMessage/ChatMessage'
import s from './ChatMessages.module.scss'

export const ChatMessages = forwardRef(({ messages, page, setIsFetching }, ref) => {
  const firstTimeRef = useRef(true)

  useEffect(() => {
    if (messages.length >= 10 && firstTimeRef.current) {
      ref.current.querySelector('ul').lastChild.scrollIntoView({ block: 'end' })
      firstTimeRef.current = false
    }
  }, [messages])

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.target.scrollTop < 200 && page > 0) {
        setIsFetching(true)
      }
    }
    if (ref.current) ref.current.addEventListener('scroll', handleScroll)
    return () => {
      if (ref.current) ref.current.removeEventListener('scroll', handleScroll)
    }
  }, [page])

  return (
    <div ref={ref} className={s.messagesWrap}>
      {messages.length === 0 ? (
        <MiddleMessage>No messages yet</MiddleMessage>
      ) : (
        <ul className={s.messages}>
          {messages.map((m) => (
            <ChatMessage key={m._id} data={m} />
          ))}
        </ul>
      )}
    </div>
  )
})
