import { Users as UsersIcon } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Contact } from '../../Navbar/Contacts/Contact/Contact'
import { Search } from '../../Search/Search'
import s from './ModalGroupMembers.module.scss'

export const ModalGroupMembers = ({ group }) => {
  const [query, setQuery] = useState('')
  const { _id } = useSelector((state) => state.auth)
  const filteredMembers = group.members.filter(
    (m) =>
      m.nickname.toLowerCase().includes(query.toLowerCase()) ||
      m.login.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <UsersIcon />
        <span>
          {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}:
        </span>
      </div>
      {group.type !== 'private' && <Search query={query} setQuery={setQuery} />}
      <ul className={s.ul}>
        {filteredMembers.map((c) => (
          <li key={c._id}>
            <Contact
              contact={c}
              group={group}
              type={_id !== group.admin ? 'list' : 'admin'}
            />
            <div className={s.admin}>
              {group.type !== 'private' && c._id === group.admin ? 'Admin' : ''}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
