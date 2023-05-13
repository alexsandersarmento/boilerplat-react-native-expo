import getUserById from '../user/getUserById'

interface IGetChatUsers {
  senderId: string
  receiverId: string
}

const getChatUsers = async ({ senderId, receiverId } : IGetChatUsers) => {
  try {
    const sender = await getUserById({
      userId: senderId,
    })
    const receiver = await getUserById({
      userId: receiverId,
    })
    
    return { sender, receiver }
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getChatUsers
