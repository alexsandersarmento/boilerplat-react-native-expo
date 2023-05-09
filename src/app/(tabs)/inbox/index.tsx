import React, { useState } from 'react'
import { ScrollView, VStack, HStack, Pressable, Text, Image, useColorModeValue, Heading } from 'native-base'
import { useRouter } from 'expo-router'

const fakeData = [
  {
    id: 1,
    name: 'John Doe',
    message: 'Hello World',
    avatar: 'https://placeimg.com/140/140/people',
    received_at: '12:00',
  },
  {
    id: 2,
    name: 'Jane Doe',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eget nisl. Donec euismod, nisl eget tempor aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eget nisl.',
    avatar: 'https://placeimg.com/140/140/people',
    received_at: '11:00',
  },
  {
    id: 3,
    name: 'John Smith',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget tempor aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eget nisl. Donec euismod, nisl eget tempor aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eget nisl.',
    avatar: 'https://placeimg.com/140/140/people',
    received_at: '10:00',
  },
  {
    id: 4,
    name: 'Jane Smith',
    message: 'Lorem dolor adipiscing elit. Donec euismod, nisl eget tempor aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc eget nisl.',
    avatar: 'https://placeimg.com/140/140/people',
    received_at: '09:00',
  },
]

export default function Inbox() {
  const [messages] = useState(fakeData)

  const navigation = useRouter()

  return (
    <ScrollView
      flex={1}
      p={4}
      bg={useColorModeValue('muted.50', 'gray.800')}
    >
      <VStack flex={1} space={4}>
        {messages.map((message, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.push({
              pathname: 'inbox/chat',
              params: {
                id: message.id,
                name: message.name,
                received_at: message.received_at,
                avatar: encodeURIComponent(message.avatar),
              },
            })}
            width='full'
            height={16}
            _pressed={{
              opacity: 0.5,
            }}
          >
            <HStack
              flex={1}
              space={4}
              alignItems='center'
            >
              <Image
                source={{ uri: message.avatar }}
                alt='Avatar'
                size={12}
                borderRadius='full'
              />
              <VStack flex={1} space={2}>
                <HStack justifyContent='space-between'>
                  <Heading fontSize={16}>{message.name}</Heading>
                  <Text fontSize={12}>{message.received_at}</Text>
                </HStack>
                <Text isTruncated>{message.message}</Text>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  )
}

