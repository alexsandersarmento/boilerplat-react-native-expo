import React from 'react'
import { Stack } from 'expo-router'
import { Switch, useColorMode, useColorModeValue, useTheme } from 'native-base'

export default function Layout() {
  const { colors } = useTheme()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Stack
      initialRouteName='login'
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: useColorModeValue(colors.gray[800], colors.muted[50]),
        headerStyle: {
          backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
        },
        headerRight: () => (
          <Switch
            isChecked={colorMode === 'dark'}
            size='sm'
            onToggle={toggleColorMode}
          />
        ),
      }}
    >
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
