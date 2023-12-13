import { memo } from 'react'
import { MiddleMessage } from '../../MiddleMessage/MiddleMessage'
import { Contact } from './Contact/Contact'

export const Contacts = memo(({ filteredContacts }) => {
  return (
    <>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((c) => <Contact contact={c} key={c._id} />)
      ) : (
        <MiddleMessage>No contacts yet</MiddleMessage>
      )}
    </>
  )
})
