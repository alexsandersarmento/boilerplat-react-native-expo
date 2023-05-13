import React from 'react'
import { Stack } from 'expo-router'

import ChatHeader from '../../components/ChatHeader'

export default function RootLayout() {
  return (
    <Stack
      initialRouteName='(tabs)'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
      />
      <Stack.Screen
        name="chat"
        options={{
          headerShown: true,
          header: () => <ChatHeader />,
        }}
      />
    </Stack>
  )
}
