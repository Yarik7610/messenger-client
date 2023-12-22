import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const WithoutAuth = ({ children }) => {
  const { token, error } = useSelector((state) => state.auth)

  return <>{token && error === null ? children : <Navigate replace to={'/login'} />}</>
}
