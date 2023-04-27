import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Switch, useColorMode, useColorModeValue, useTheme } from 'native-base'

export default function Layout() {
  const { colors } = useTheme()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Tabs
      screenOptions={{
        headerTintColor: useColorModeValue(colors.gray[800], colors.muted[50]),
        headerStyle: {
          backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
          elevation: 0,
          shadowOpacity: 0,
        },
        headerRight: () => (
          <Switch
            isChecked={colorMode === 'dark'}
            size='sm'
            onToggle={toggleColorMode}
          />
        ),
        tabBarStyle: {
          backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
        },
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          headerTitle: () => null,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: useColorModeValue(colors.gray[800], colors.muted[50]),
          },
          headerRight: () => (
            <Switch
              isChecked={colorMode === 'dark'}
              size='sm'
              onToggle={toggleColorMode}
            />
          ),
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons 
              name="home"
              color={useColorModeValue(colors.gray[800], colors.muted[50])}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  )
}
