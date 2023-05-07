import React, { createContext, useEffect } from 'react'
import { MMKV, useMMKVObject } from 'react-native-mmkv'
import { useRouter, useSegments } from 'expo-router'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

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
    const currentUser = auth().currentUser
    setUser(currentUser || undefined)
  }

  const logout = async () => {
    const isGoogleUser = await GoogleSignin.isSignedIn()
    if (isGoogleUser) {
      GoogleSignin.signOut()
    }
    
    auth().signOut().then(() => {
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
