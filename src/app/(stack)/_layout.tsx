import React from 'react'
import { Stack } from 'expo-router'
import { Box, Image, Text } from 'native-base'
import { useSearchParams } from 'expo-router'

export default function RootLayout() {
  const params = useSearchParams()

  const HeaderTitleWithAvatar = () => (
    <Box flexDirection='row' alignItems='center'>
      <Image
        source={{ uri: decodeURIComponent(params.receiverAvatar as string) }}
        alt='Avatar'
        size={8}
        borderRadius='full'
      />
      <Text ml={2} fontSize={16} fontWeight='bold'>
        {params.receiverName}
      </Text>
    </Box>
  )

  return (
    <Stack
      initialRouteName='(tabs)'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
      />
      <Stack.Screen
        name="chat"
        options={{
          headerShown: true,
          headerTitle: HeaderTitleWithAvatar,
        }}
      />
    </Stack>
  )
}
