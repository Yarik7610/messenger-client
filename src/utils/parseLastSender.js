export const parseLastSender = (lastSender) =>
  lastSender.length > 15 ? lastSender.slice(0, 15) + '...' : lastSender
