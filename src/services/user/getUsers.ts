import firebase from '../firebase'

const getUsers = async () => {
  const users = await firebase.database().ref('users').once('value')
  return users.val()
}

export default getUsers
