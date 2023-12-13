import { useSocket } from '../../contexts/SocketProvider'
import { useAvatarPicture } from '../../utils/useAvatarPicture'
import s from './Avatar.module.scss'

export const Avatar = ({ avatarPicture, id }) => {
  const { activeUsers } = useSocket()

  const isOnline = activeUsers.some((u) => u.id === id)
  return (
    <div className={`${s.imgWrap} ${isOnline ? s.online : ''}`}>
      <img src={useAvatarPicture(avatarPicture)} />
    </div>
  )
}
