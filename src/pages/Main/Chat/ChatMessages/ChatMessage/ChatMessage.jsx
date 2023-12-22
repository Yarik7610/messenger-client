import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import TimeAgo from 'timeago-react'
import { Avatar } from '../../../../../components/Avatar/Avatar'
import s from './ChatMessage.module.scss'

export const ChatMessage = ({ data }) => {
  const { text, sender, createdAt } = data
  const { avatarPicture, nickname } = sender
  const { _id } = useSelector((state) => state.auth)

  const isYou = _id === sender._id

  return (
    <li className={`${s.li} ${isYou ? `${s.you}` : ''}`}>
      <div className={s.wrap}>
        {/* не передаю айди в аватар спецом чтобы не отображался статус человека */}
        {!isYou && <Avatar avatarPicture={avatarPicture} />}
        <div className={s.contentWrap}>
          <div className={s.data}>
            {!isYou && <h3 className={s.nickname}>{nickname}</h3>}
            <p>
              {text.split('\n').map((line, i) => (
                <Fragment key={i}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </p>
          </div>
          <TimeAgo style={{ color: '#707579', fontSize: '14px' }} datetime={createdAt} />
        </div>
      </div>
    </li>
  )
}
