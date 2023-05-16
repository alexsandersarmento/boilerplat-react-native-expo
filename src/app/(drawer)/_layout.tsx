import React from 'react'
import { Drawer } from 'expo-router/drawer'

import CustomDrawerContent from '../../components/CustomDrawerContent'
import DrawerHeader from '../../components/DrawerHeader'

export default function RootLayout() {
  return (
    <Drawer
      initialRouteName='(stack)'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(stack)"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          header: (props) => <DrawerHeader {...props} title="Settings" />,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          header: (props) => <DrawerHeader {...props} title="Profile" />,
        }}
      />
    </Drawer>
  )
}
