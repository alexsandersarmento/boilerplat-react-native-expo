import React, { createContext, useEffect } from 'react'
import { MMKV, useMMKVObject } from 'react-native-mmkv'
import { useRouter, useSegments } from 'expo-router'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { firebase } from '@services'

type IUserData = FirebaseAuthTypes.User

interface IAuthContextProvider {
  children: React.ReactNode;
}

interface IAuthContextData {
  user: IUserData | undefined;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

const storage = new MMKV()

const useProtectedRoute = (user: IUserData | undefined) => {
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1066131766845-kcon415bejif60epslrb86bkbmgm2mg4.apps.googleusercontent.com',
    })
  }, [])

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'
    
    if (!user && !inAuthGroup) {
      router.replace('/login')
    } else if (user && inAuthGroup) {
      router.replace('/')
    }
  }, [user, segments])
}

export const AuthProvider: React.FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = useMMKVObject<IUserData>('user', undefined)
  useProtectedRoute(user)
  
  const login = async () => {
    const currentUser = firebase.auth().currentUser

    if (!currentUser) return

    setUser(currentUser || undefined)

    const usersRef = firebase.database().ref('users')
    const userRef = usersRef.child(currentUser?.uid || '0')

    userRef.update({ status: 'online' })

  }

  const logout = async () => {
    const isGoogleUser = await GoogleSignin.isSignedIn()
    if (isGoogleUser) {
      GoogleSignin.signOut()
    }
    
    firebase.auth().signOut().then(() => {
      const userRef = firebase.database().ref(`users/${user?.uid}`)
      userRef.update({ status: 'offline' })
      storage.delete('user')
    }).catch(error => {
      console.error(error)
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
