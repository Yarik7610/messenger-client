import { Users as UsersIcon } from 'lucide-react'
import { memo } from 'react'
import { Contact } from '../../Navbar/Contacts/Contact/Contact'
import s from './ModalGroupMembers.module.scss'

export const ModalGroupMembers = memo(({ members }) => {
  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <UsersIcon />
        <span>{members.length} members:</span>
      </div>
      <ul className={s.ul}>
        {members.map((c) => (
          <Contact contact={c} key={c._id} type="list" />
        ))}
      </ul>
    </div>
  )
})
