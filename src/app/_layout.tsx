import React from 'react'
import {
  SplashScreen,
  Slot,
} from 'expo-router'
import { useFonts, Inter_500Medium } from '@expo-google-fonts/inter'

import { AppProvider } from '../contexts/AppProvider'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  })

  if (!fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  )
}
