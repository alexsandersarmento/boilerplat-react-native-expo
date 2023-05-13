import { firebase } from '../firebase'
import { generateChatId } from '../../utils'

interface IMessage {
  senderId: string
  receiverId: string
  message: string
}

const sendMessage = async ({
  senderId,
  receiverId,
  message,
}: IMessage) => {
  try {
    const chatId = generateChatId({
      userId1: senderId,
      userId2: receiverId,
    })

    const messageData = {
      senderId,
      receiverId,
      message,
      read: false,
      timestamp: Date.now(),
    }

    await firebase.database().ref(`inbox/${senderId}/${chatId}`).set(messageData)
    await firebase.database().ref(`inbox/${receiverId}/${chatId}`).set(messageData)
    firebase.database().ref(`chats/${chatId}/messages`).push(messageData)
  } catch (error) {
    console.error(error)
  }
}

export default sendMessage
