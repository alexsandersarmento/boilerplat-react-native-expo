import React, { createContext, useEffect } from 'react'
import { MMKV, useMMKVObject } from 'react-native-mmkv'
import { useRouter, useSegments } from 'expo-router'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

interface IUser {
  displayName: string | null;
  email: string | null;
}

interface IAuthContextProvider {
  children: React.ReactNode;
}

interface IAuthContextData {
  user: IUser | undefined;
  login: (user: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

const storage = new MMKV()

const useProtectedRoute = (user: IUser | undefined) => {
  const segments = useSegments()
  const router = useRouter()

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
  const [user, setUser] = useMMKVObject<IUser>('user', undefined)
  useProtectedRoute(user)
  
  const login = (data: IUser) => {
    setUser(data)
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
