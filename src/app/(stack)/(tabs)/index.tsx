import React from 'react'
import { Center, VStack, Text, Button, Image, useColorModeValue } from 'native-base'

import { useAuth } from '../../../hooks/useAuth'

export default function Home() {
  const { logout, user } = useAuth()

  return (
    <Center flex={1} bg={useColorModeValue('gray.50', 'gray.800')}>
      <VStack space={2} w='90%'>
        {user?.photoURL && (
            <Image
              source={{ uri: user?.photoURL }}
              alt='Profile Avatar'
              size={100}
              rounded='full'
            />
        )}
        <Text>Welcome, {user?.displayName}</Text>
        <Button onPress={logout} w='100%'>
          Logout
        </Button>
      </VStack>
    </Center>
  )
}
