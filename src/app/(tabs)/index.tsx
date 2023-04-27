import React from 'react'
import { Center, VStack, Text, Button } from 'native-base'

import { useAuth } from '../../hooks/useAuth'

export default function HelloWorld() {
  const { logout, user } = useAuth()

  return (
    <Center flex={1} bg='muted.50'>
      <VStack space={2} w='90%'>
        <Text>Email: {user?.email}</Text>
        <Text>Password: {user?.password}</Text>
        <Button onPress={logout} w='100%'>
          Logout
        </Button>
      </VStack>
    </Center>
  )
}
