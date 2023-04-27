import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          title: 'Sign up',
        }}
      />
    </Stack>
  )
}
