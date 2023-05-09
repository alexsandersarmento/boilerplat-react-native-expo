import React from 'react'
import { Stack, useSearchParams } from 'expo-router'
import { useColorModeValue, useTheme, Box, Text, Image } from 'native-base'

export default function Layout() {
  const { colors } = useTheme()

  const params = useSearchParams()

  const HeaderTitleWithAvatar = () => (
    <Box flexDirection='row' alignItems='center'>
      <Image
        source={{ uri: decodeURIComponent(params.avatar as string) }}
        alt='Avatar'
        size={8}
        borderRadius='full'
      />
      <Text ml={2} fontSize={16} fontWeight='bold'>
        {params.name}
      </Text>
    </Box>
  )

  return (
    <Stack
      initialRouteName='inbox'
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: useColorModeValue(colors.gray[800], colors.muted[50]),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Inbox',
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          headerTitle: () => <HeaderTitleWithAvatar />,
        }}
      />
    </Stack>
  )
}
