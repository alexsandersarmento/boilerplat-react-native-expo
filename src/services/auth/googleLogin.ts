import { GoogleSignin } from '@react-native-google-signin/google-signin'

import firebase from '../firebase'

const googleLogin = async () => {
  await GoogleSignin.hasPlayServices()
  const { idToken } = await GoogleSignin.signIn()
  const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken)
  const { user, additionalUserInfo } = await firebase.auth().signInWithCredential(googleCredential)
  
  if (additionalUserInfo?.isNewUser) {
    const userRef = firebase.database().ref('users/' + user.uid)

    await userRef.set({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })
  }
}

export default googleLogin
