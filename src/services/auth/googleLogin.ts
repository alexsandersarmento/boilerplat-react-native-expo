import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { firebase } from '../firebase'

const googleLogin = async () => {
  await GoogleSignin.hasPlayServices()
  const { idToken } = await GoogleSignin.signIn()
  const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken)
  await firebase.auth().signInWithCredential(googleCredential)
}

export default googleLogin
