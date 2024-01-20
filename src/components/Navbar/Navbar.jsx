import { Menu as MenuIcon } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { filterNavbarList } from '../../utils/filterNavbarList'
import { RoundButton } from '../RoundButton/RoundButton'
import { Search } from '../Search/Search'
import { ChoiceSection } from './ChoiceSection/ChoiceSection'
import { Contacts } from './Contacts/Contacts'
import { Groups } from './Groups/Groups'
import { Menu } from './Menu/Menu'
import s from './Navbar.module.scss'

export const Navbar = () => {
  const [query, setQuery] = useState('')
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [section, setSection] = useState(0)
  const burgerRef = useRef(null)

  const handleSection = (sectionId) => setSection(sectionId)

  const { contacts } = useSelector((state) => state.contact)
  const { groups } = useSelector((state) => state.group)

  const filteredContacts = useMemo(
    () => filterNavbarList(query, 'contacts', contacts),
    [contacts, query]
  )
  const filteredGroups = useMemo(() => filterNavbarList(query, 'groups', groups), [groups, query])

  return (
    <nav className={s.nav}>
      <div className={s.headerWrap}>
        <RoundButton onClick={() => setIsMenuOpened(!isMenuOpened)} ref={burgerRef}>
          <MenuIcon color="#707579" />
        </RoundButton>
        <Search query={query} setQuery={setQuery} width="85%" />
      </div>
      <ChoiceSection section={section} handleSection={handleSection} />
      <ul className={s.navbarList}>
        {section === 0 ? (
          <Groups filteredGroups={filteredGroups} />
        ) : (
          <Contacts filteredContacts={filteredContacts} />
        )}
      </ul>
      {isMenuOpened && <Menu ref={burgerRef} setIsMenuOpened={setIsMenuOpened} />}
    </nav>
  )
}
