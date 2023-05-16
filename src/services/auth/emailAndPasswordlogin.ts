import type { TLoginData } from '../../app/(auth)/login'
import firebase from '../firebase'

interface IEmailAndPasswordLogin {
  data: TLoginData
  onSuccess: () => void
}

const emailAndPasswordlogin = async ({
  data,
  onSuccess,
}: IEmailAndPasswordLogin) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    onSuccess()
  } catch (error) {
    console.error(error)
  }
}

export default emailAndPasswordlogin
