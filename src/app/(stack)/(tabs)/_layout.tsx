import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Switch, useColorMode, useColorModeValue, useTheme } from 'native-base'

export default function Layout() {
  const { colors } = useTheme()
  const { colorMode, toggleColorMode } = useColorMode()

  const getIconColor = (focused: boolean) => {
    if (focused) {
      return useColorModeValue(colors.gray[800], colors.muted[50])
    } else {
      return colors.gray[400]
    }
  }

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
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: useColorModeValue(colors.gray[800], colors.muted[50]),
          },
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons 
              name="home"
              color={getIconColor(focused)}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarLabel: 'Inbox',
          tabBarLabelStyle: {
            color: useColorModeValue(colors.gray[800], colors.muted[50]),
          },
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name="chat"
              color={getIconColor(focused)}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lobby"
        options={{
          title: 'Lobby',
          tabBarLabel: 'Lobby',
          tabBarLabelStyle: {
            color: useColorModeValue(colors.gray[800], colors.muted[50]),
          },
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              name="chat-plus"
              color={getIconColor(focused)}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  )
}
