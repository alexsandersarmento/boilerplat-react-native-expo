interface IGenerateChatId {
  userId1: string
  userId2: string
}

export default function generateChatId({ userId1, userId2 } : IGenerateChatId) {
  const sortedIds = [userId1, userId2].sort()
  const chatId = sortedIds.join('_')

  return chatId
}

