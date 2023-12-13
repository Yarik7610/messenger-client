import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './Pages/Login/Login'
import { Signup } from './Pages/Signup/Signup'
import { WithAuth } from './components/Hocs/WithAuth'
import { useSocket } from './contexts/SocketProvider'
import { Chat } from './pages/Main/Chat/Chat'
import { Main } from './pages/Main/Main'
import { me } from './redux/slices/authSlice'

export const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, error, statusMsg } = useSelector((state) => state.auth)
  const { socket } = useSocket()

  useEffect(() => {
    if (statusMsg && error) toast.error(statusMsg)
    else if (statusMsg && !error) toast.success(statusMsg)
  }, [statusMsg, error])

  useEffect(() => {
    if (!error && token) {
      dispatch(me())
      if (socket) socket.connect()
      navigate('/')
    }
  }, [])

  return (
    <div className="appWrap">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <WithAuth>
              <Main />
            </WithAuth>
          }>
          <Route
            path="/:groupId"
            element={
              <WithAuth>
                <Chat />
              </WithAuth>
            }
          />
        </Route>
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
      <ToastContainer autoClose={2500} />
    </div>
  )
}
