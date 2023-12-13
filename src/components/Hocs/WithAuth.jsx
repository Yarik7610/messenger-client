import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const WithAuth = ({ children }) => {
  const { token, error } = useSelector((state) => state.auth)

  return <>{token && error === null ? children : <Navigate to={'/login'} />}</>
}
