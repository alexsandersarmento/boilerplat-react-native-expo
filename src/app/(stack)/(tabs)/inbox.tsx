import React, { useState, useEffect } from 'react'
import { ScrollView, VStack, HStack, Pressable, Text, Image, useColorModeValue, Heading } from 'native-base'
import { useRouter } from 'expo-router'

import { getUserInbox } from '../../../services'
import { useAuth } from '../../../hooks/useAuth'

interface IInboxMessage {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: number;
  receiver: {
    email: string;
    name: string;
    photoURL: string;
    status: string;
  }
  sender: {
    email: string;
    name: string;
    photoURL: string;
    status: string;
  }
}

export default function Inbox() {
  const [inboxMessages, setInboxMessages] = useState<IInboxMessage[] | []>([])

  const { user } = useAuth()
  const navigation = useRouter()

  useEffect(() => {
    const fetchInbox = async () => {
      const inbox = await getUserInbox(user?.uid as string)
      setInboxMessages(inbox)
    }

    fetchInbox()
  }, [])

  return (
    <ScrollView
      flex={1}
      p={4}
      bg={useColorModeValue('muted.50', 'gray.800')}
    >
      <VStack flex={1} space={4}>
        {inboxMessages.map((inboxMessage, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.push({
              pathname: 'chat',
              params: {
                currentUserId: user?.uid,
                receiverId: inboxMessage.receiverId,
                receiverName: inboxMessage.receiver.name,
                receiverAvatar: encodeURIComponent(inboxMessage.receiver.photoURL),
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
                source={{ uri: inboxMessage.receiver.photoURL }}
                alt='Avatar'
                size={12}
                borderRadius='full'
              />
              <VStack flex={1} space={2}>
                <HStack justifyContent='space-between'>
                  <Heading fontSize={16}>{inboxMessage.receiver.name}</Heading>
                  <Text fontSize={12}>{inboxMessage.timestamp}</Text>
                </HStack>
                <Text isTruncated>{inboxMessage.message}</Text>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  )
}

