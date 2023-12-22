import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './Pages/Login/Login'
import { Signup } from './Pages/Signup/Signup'
import { WithAuth } from './components/Hocs/WithAuth'
import { WithoutAuth } from './components/Hocs/WithoutAuth'
import { MiddleMessage } from './components/MiddleMessage/MiddleMessage'
import { Chat } from './pages/Main/Chat/Chat'
import { Main } from './pages/Main/Main'
import { me } from './redux/slices/authSlice'

export const App = () => {
  const dispatch = useDispatch()
  const { token, error, statusMsg } = useSelector((state) => state.auth)

  useEffect(() => {
    if (statusMsg && error) toast.error(statusMsg)
    else if (statusMsg && !error) toast.success(statusMsg)
  }, [statusMsg, error])

  useEffect(() => {
    if (!error && token) {
      dispatch(me())
    }
  }, [])

  return (
    <div className="appWrap">
      <Routes>
        <Route
          path="/login"
          element={
            <WithAuth>
              <Login />
            </WithAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <WithAuth>
              <Signup />
            </WithAuth>
          }
        />
        <Route
          path="/"
          element={
            <WithoutAuth>
              <Main />
            </WithoutAuth>
          }>
          <Route
            path="chat/:groupId"
            element={
              <WithoutAuth>
                <Chat />
              </WithoutAuth>
            }
          />
        </Route>
        <Route path="*" element={<MiddleMessage>Not found</MiddleMessage>} />
      </Routes>
      <ToastContainer autoClose={2500} />
    </div>
  )
}
