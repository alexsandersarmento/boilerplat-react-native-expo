import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
