import React from 'react'
import { Center, Text, useColorModeValue } from 'native-base'

export default function Home() {
  return (
    <Center flex={1} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Text>Home</Text>
    </Center>
  )
}
