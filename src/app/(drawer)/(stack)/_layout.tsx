import React from 'react'
import { Stack } from 'expo-router'

import { ChatHeader } from '@components'

export default function RootLayout() {
  return (
    <Stack initialRouteName='(tabs)'>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          header: () => <ChatHeader />,
        }}
      />
    </Stack>
  )
}
