import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorModeValue, useTheme } from 'native-base'

import TabsHeader from '../../../../components/TabsHeader'

export default function Layout() {
  const { colors } = useTheme()

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
        header: () => <TabsHeader />,
        headerTintColor: useColorModeValue(colors.gray[800], colors.muted[50]),
        headerStyle: {
          backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarStyle: {
          backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
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
