import { firebase } from '../firebase'
import { generateChatId } from '../../utils'

interface IGetChatMessages {
  chatId: string
  currentUserId?: string
  receiverId?: string
}

const getChatMessages = async ({ chatId, currentUserId, receiverId } : IGetChatMessages) => {
  try {
    let currentChatId = chatId

    if (!chatId && currentUserId && receiverId) {
      currentChatId = generateChatId({
        userId1: currentUserId,
        userId2: receiverId,
      })
    }

    const chatRef = firebase.database().ref(`chats/${currentChatId}/messages`)
    const snapshot = await chatRef.once('value')
    const messagesObj = snapshot.val()

    if (!messagesObj) {
      return []
    }

    const formattedMessages = Object.keys(messagesObj).map((key) => ({
      id: key,
      ...messagesObj[key],
    }))
    
    return formattedMessages
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getChatMessages
