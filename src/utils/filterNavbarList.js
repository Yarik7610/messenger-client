export const filterNavbarList = (query, type, list) => {
  if (type === 'contacts')
    return list.filter(
      (li) =>
        li.nickname.toLowerCase().includes(query.toLowerCase()) ||
        li.login.toLowerCase().includes(query.toLowerCase())
    )
  else if (type === 'groups') {
    let listWithGroups = list.filter(
      (li) => li.type !== 'private' && li.name.toLowerCase().includes(query.toLowerCase())
    )
    let listWithNicksOrLogins = list.filter(
      (li) =>
        li.type === 'private' &&
        li.members.some(
          (m) =>
            m.nickname.toLowerCase().includes(query.toLowerCase()) ||
            m.login.toLowerCase().includes(query.toLowerCase())
        )
    )
    return [...listWithNicksOrLogins, ...listWithGroups]
  }
}
