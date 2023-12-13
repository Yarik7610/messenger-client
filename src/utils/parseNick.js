export const parseNick = (nickname) => {
  return nickname.length > 18 ? nickname.slice(0, 18) + '...' : nickname
}
