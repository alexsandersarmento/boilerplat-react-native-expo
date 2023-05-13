import { firebase } from '../firebase'
import { IInboxMessage } from '../../app/(stack)/(tabs)/inbox'

const getUserInbox = async (userId: string) => {
  try {
    const inboxRef = firebase.database().ref(`inbox/${userId}`)
    const snapshot = await inboxRef.once('value')
    const inbox = snapshot.val() || {}

    const messages = (Object.values(inbox) as IInboxMessage[]).map(async (message) => {
      const otherUserId = message.senderId === userId ? message.receiverId : message.senderId
      const userRef = firebase.database().ref(`users/${otherUserId}`)
      const userSnapshot = await userRef.once('value')
      const userData = {
        id: otherUserId,
        ...userSnapshot.val(),
      }
      
      return {
        ...message,
        chatId: Object.keys(inbox)[0],
        otherUser: userData,
      }
    })

    const resolvedMessages = await Promise.all(messages)
    const sortedMessages = resolvedMessages.sort(
      (a: IInboxMessage, b: IInboxMessage) => b.timestamp - a.timestamp,
    )

    return sortedMessages
  } catch (error) {
    console.error(error)
    return []
  }
}

export default getUserInbox
