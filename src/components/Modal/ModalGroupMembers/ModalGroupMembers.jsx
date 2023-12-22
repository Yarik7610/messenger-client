import { Users as UsersIcon } from 'lucide-react'
import { memo, useState } from 'react'
import { Contact } from '../../Navbar/Contacts/Contact/Contact'
import { Search } from '../../Search/Search'
import s from './ModalGroupMembers.module.scss'

export const ModalGroupMembers = memo(({ members }) => {
  const [query, setQuery] = useState('')

  const filteredMembers = members.filter((m) =>
    m.nickname.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <UsersIcon />
        <span>{filteredMembers.length} members:</span>
      </div>
      <Search query={query} setQuery={setQuery} width="95%" />
      <ul className={s.ul}>
        {filteredMembers.map((c) => (
          <Contact contact={c} key={c._id} type="list" />
        ))}
      </ul>
    </div>
  )
})
