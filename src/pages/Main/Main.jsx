import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { MiddleMessage } from '../../components/MiddleMessage/MiddleMessage'
import { Navbar } from '../../components/Navbar/Navbar'
import { useWindowSize } from '../../hooks/useWindowSize'
import { getContacts } from '../../redux/slices/contactSlice'
import { getGroups } from '../../redux/slices/groupSlice'
import s from './Main.module.scss'

export const Main = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const windowSize = useWindowSize()

  useEffect(() => {
    dispatch(getContacts())
    dispatch(getGroups())
  }, [])

  return (
    <div className={s.grid}>
      <Navbar />
      {windowSize.width > 768 ? (
        <div className={s.right}>
          {params.groupId ? <Outlet /> : <MiddleMessage>Choose group</MiddleMessage>}
        </div>
      ) : (
        <div className={`${s.right} ${s.mobile} ${params.groupId ? `${s.active}` : ''}`}>
          <Outlet />
        </div>
      )}
    </div>
  )
}
