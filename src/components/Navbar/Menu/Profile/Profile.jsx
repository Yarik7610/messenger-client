import { Image as ImageIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePhoto } from '../../../../redux/slices/authSlice'
import { Avatar } from '../../../Avatar/Avatar'
import { LoginTag } from '../../../LoginTag/LoginTag'
import { MenuButton } from '../../../MenuButton/MenuButton'
import s from './Profile.module.scss'

export const Profile = () => {
  const { _id, login, nickname, avatarPicture } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onPhotoSelected = (e) => {
    const formData = new FormData()
    formData.append('avatarPicture', e.target.files[0])
    dispatch(updatePhoto(formData))
  }

  return (
    <div className={s.wrap}>
      <div className={s.imgAndNickAndLogin}>
        <Avatar avatarPicture={avatarPicture} id={_id} />
        <div className={s.loginAndNick}>
          <h3 className={s.nickname}>{nickname}</h3>
          <LoginTag>{login}</LoginTag>
        </div>
      </div>
      <MenuButton type="input">
        <ImageIcon strokeWidth="1px" />
        <input type="file" accept=".png,.webp" onChange={onPhotoSelected} hidden />
        <span>Change avatar</span>
      </MenuButton>
    </div>
  )
}
