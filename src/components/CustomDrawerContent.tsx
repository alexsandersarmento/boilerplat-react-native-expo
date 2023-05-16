import React from 'react'
import { Box, IconButton, Icon } from 'native-base'
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router/src/useNavigation'
import { DrawerActions } from '@react-navigation/routers'
import { Link } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import DrawerItem from './DrawerItem'

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <Box flex={1} pt={10}>
      <IconButton
        zIndex={1}
        position="absolute"
        top={insets.top + 2}
        _pressed={{ bg: 'transparent', opacity: 0.5 }}
        icon={
          <Icon
            as={<MaterialCommunityIcons name="close" />}
            color="gray.800"
            size={6}
          />
        }
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerContentScrollView {...props} style={{ marginTop: insets.top, gap: 2 }}>
        <Link href="settings" asChild>
          <DrawerItem title="Settings" {...props}/>
        </Link>
        <Link href="profile" asChild>
          <DrawerItem title="Profile" {...props}/>
        </Link>
      </DrawerContentScrollView>
    </Box>
  )
}
