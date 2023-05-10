import { Platform } from 'react-native'

import type { TUserData } from '../../app/(auth)/signUp'
import { firebase } from '../firebase'

interface ICreateUser {
  data: TUserData
  onSuccess: () => void
}

const createUser = async ({
  data,
  onSuccess,
}: ICreateUser) => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
  
    const { profileAvatar } = data
    const filename = profileAvatar.substring(profileAvatar.lastIndexOf('/') + 1)
    const uploadUri = Platform.OS === 'ios' ? profileAvatar.replace('file://', '') : profileAvatar
    const task = firebase.storage().ref(filename).putFile(uploadUri)
    
    await task

    const url = await firebase.storage().ref(filename).getDownloadURL()

    await user.updateProfile({
      displayName: data.name,
      photoURL: url,
    })

    const userRef = firebase.database().ref('users/' + user.uid)

    await userRef.set({
      name: data.name,
      email: data.email,
      photoURL: url,
    })

    onSuccess()
  } catch (error) {
    await firebase.auth().currentUser?.delete()
  }
}

export default createUser
