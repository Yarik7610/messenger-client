import { memo } from 'react'
import { MiddleMessage } from '../../MiddleMessage/MiddleMessage'
import { Group } from './Group/Group'

export const Groups = memo(({ filteredGroups }) => {
  return (
    <>
      {filteredGroups.length > 0 ? (
        filteredGroups.map((g) => <Group group={g} key={g._id} />)
      ) : (
        <MiddleMessage>No groups yet</MiddleMessage>
      )}
    </>
  )
})
