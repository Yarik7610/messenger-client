import { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const { _id } = useSelector((state) => state.auth)
  const [socket, setSocket] = useState(null)
  const [activeUsers, setActiveUsers] = useState(null)

  useEffect(() => {
    if (!_id) return
    const newSocket = io.connect('http://localhost:3001', { query: { id: _id } })
    newSocket.emit('addNewUser', _id)

    const handleGetActiveUsers = (activeUsers) => {
      setActiveUsers(activeUsers)
    }
    newSocket.on('getActiveUsers', handleGetActiveUsers)

    setSocket(newSocket)

    return () => {
      newSocket.off('getActiveUsers', handleGetActiveUsers)
      newSocket.disconnect()
    }
  }, [_id])

  const reconnectSocket = () => {
    if (socket && !socket.connected) {
      socket.connect()
    }
  }
  return (
    <SocketContext.Provider value={{ socket, reconnectSocket, activeUsers }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
