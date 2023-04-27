import React from 'react'
import { NativeBaseProvider } from 'native-base'

import { AuthProvider } from './AuthContext'

type AppProviderProps = {
  children: React.ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NativeBaseProvider>
  )
}
