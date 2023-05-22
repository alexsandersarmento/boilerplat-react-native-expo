import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from '../store'

import { AuthProvider } from './AuthContext'

type AppProviderProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <NativeBaseProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ReduxProvider>
    </NativeBaseProvider>
  )
}
