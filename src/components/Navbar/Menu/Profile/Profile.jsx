import { Image as ImageIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePhoto } from '../../../../redux/slices/authSlice'
import { Avatar } from '../../../Avatar/Avatar'
// import { MenuButton } from '../../../MenuButton/MenuButton'
import { MenuButton } from '../../../MenuButton/MenuButton'
import s from './Profile.module.scss'

export const Profile = () => {
  const { _id, nickname, avatarPicture } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onPhotoSelected = (e) => {
    const formData = new FormData()
    formData.append('avatarPicture', e.target.files[0])
    dispatch(updatePhoto(formData))
  }

  return (
    <div className={s.wrap}>
      <div className={s.imgAndNick}>
        <Avatar avatarPicture={avatarPicture} id={_id} />
        <h3 className={s.nickname}>{nickname}</h3>
      </div>
      <MenuButton type="input">
        <ImageIcon strokeWidth="1px" />
        <input type="file" accept=".png,.webp" onChange={onPhotoSelected} hidden />
        <span>Change avatar</span>
      </MenuButton>
    </div>
  )
}
