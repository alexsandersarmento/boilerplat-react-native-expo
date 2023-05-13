import { firebase } from '../firebase'

interface IGetUserById {
  userId: string
}

const getUserById = async ({ userId } : IGetUserById) => {
  try {
    const userRef = firebase.database().ref(`users/${userId}`)
    const snapshot = await userRef.once('value')
    const user = snapshot.val()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getUserById
