export const parseNick = (nickname) => {
  return nickname.length > 18 ? nickname.slice(0, 18) + '...' : nickname
}
export const parseLongNick = (nickname) => {
  return nickname.length > 13 ? nickname.slice(0, 13) + '...' : nickname
}
