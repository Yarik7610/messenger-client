export const parseLastMessage = (lastMessage) => {
  return lastMessage.length > 15 ? lastMessage.slice(0, 15) + '...' : lastMessage
}
