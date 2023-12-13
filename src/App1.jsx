import { useEffect, useRef, useState } from 'react'
import { useSocket } from './contexts/SocketProvider'

export const App1 = () => {
  const { socket } = useSocket()
  const [isConnected, setIsConnected] = useState(false)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const lastMockMessageRef = useRef(null)

  const sendMessage = () => {
    if (!text) return
    if (!socket) return
    socket.emit('send_message', { text: text, time: Date.now(), name: 'Kek' })
    setText('')
  }

  useEffect(() => {
    if (messages.length > 0) lastMockMessageRef.current.scrollIntoView()
  }, [messages])

  useEffect(() => {
    if (!socket) return
    const onConnect = () => {
      setIsConnected(true)
    }
    const onDisconnect = () => {
      setIsConnected(false)
    }
    const onReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data])
    }
    const onReceiveMessageInitial = (data) => {
      setMessages(data)
    }
    socket.on('connect', onConnect)
    socket.on('receive_message_initial', onReceiveMessageInitial)
    socket.on('receive_message', onReceiveMessage)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.on('receive_message_initial', onReceiveMessageInitial)
      socket.on('receive_message', onReceiveMessage)
      socket.on('disconnect', onDisconnect)
    }
  }, [socket])

  return (
    <div>
      <div>{isConnected.toString()}</div>
      <input placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} />
      <button disabled={!isConnected} onClick={sendMessage}>
        Send message
      </button>
      <ul style={{ height: '300px', overflow: 'auto' }}>
        {messages.map((m, i) => (
          <li key={i}>
            {/* <h3>{m.sender}</h3> */}
            <p>{m.text}</p>
            {/* <span>Sent: {m.time}</span> */}
          </li>
        ))}
        <div ref={lastMockMessageRef}></div>
      </ul>
    </div>
  )
}
