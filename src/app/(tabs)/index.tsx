import React from 'react'
import { Center, VStack, Text, Button, useColorModeValue } from 'native-base'

import { useAuth } from '../../hooks/useAuth'

export default function HelloWorld() {
  const { logout, user } = useAuth()

  return (
    <Center flex={1} bg={useColorModeValue('gray.50', 'gray.800')}>
      <VStack space={2} w='90%'>
        <Text>Welcome, {user?.displayName}</Text>
        <Button onPress={logout} w='100%'>
          Logout
        </Button>
      </VStack>
    </Center>
  )
}
