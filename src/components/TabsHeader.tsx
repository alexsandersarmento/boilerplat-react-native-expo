import React from 'react'
import { Heading, HStack, Icon, IconButton, useColorModeValue, useTheme } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { DrawerActions } from '@react-navigation/routers'

import { useAuth } from '@hooks'

export default function TabsHeader() {
  const { colors } = useTheme()
  const { user, logout } = useAuth()
  const navigation = useNavigation()

  return (
    <HStack
      safeAreaTop
      bg={useColorModeValue(colors.gray[50], colors.gray[800])}
      px={4}
      py={4}
      alignItems="center"
      justifyContent='space-between'
    >
      <HStack alignItems='center' space={2}>
        <IconButton
          variant="ghost"
          _pressed={{ bg: 'transparent', opacity: 0.5 }}
          icon={
            <Icon
              as={<MaterialCommunityIcons name="menu" />}
              color={useColorModeValue(colors.gray[800], colors.muted[50])}
              size={6}
            />
          }
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Heading size="md" color={useColorModeValue(colors.gray[800], colors.muted[50])}>
          {user?.displayName}
        </Heading>
      </HStack>
      <IconButton
        variant="ghost"
        icon={
          <Icon
            as={<MaterialCommunityIcons name="logout" />}
            color={useColorModeValue(colors.gray[800], colors.muted[50])}
            size="sm"
          />
        }
        onPress={logout}
      />
    </HStack>
  )
}
