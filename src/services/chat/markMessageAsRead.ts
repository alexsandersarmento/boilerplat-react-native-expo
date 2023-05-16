import firebase from '../firebase'

interface IMarkMessageAsRead {
  userId: string
  chatId: string
  messageId: string
}

const markMessageAsRead = async ({ userId, chatId, messageId }: IMarkMessageAsRead) => {
  try {
    const messageRef = firebase.database().ref(`chats/${chatId}/messages/${messageId}`)
    await messageRef.update({ read: true })
    const inboxRef = firebase.database().ref(`inbox/${userId}/${chatId}`)
    await inboxRef.update({ read: true })
  } catch (error) {
    console.error(error)
  }
}

export default markMessageAsRead
