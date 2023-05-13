import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, VStack, HStack, Pressable, Text, Image, useColorModeValue, Heading, Box } from 'native-base'
import { useRouter, useNavigation } from 'expo-router'

import { getUserInbox } from '../../../services'
import { useAuth } from '../../../hooks/useAuth'
import { firebase } from '../../../services/firebase'

export interface IInboxMessage {
  chatId: string;
  senderId: string;
  receiverId: string;
  message: string;
  read: boolean;
  timestamp: number;
  otherUser: {
    id: string;
    email: string;
    name: string;
    photoURL: string;
    status: string;
  }
}

export default function Inbox() {
  const [inboxMessages, setInboxMessages] = useState<IInboxMessage[] | []>([])

  const { user } = useAuth()
  const router = useRouter()
  const navigation = useNavigation()
  
  const isMessageRead = (message: IInboxMessage) => {
    if (message.senderId === user?.uid) return true

    return message.read
  }
  
  const fetchInbox = useCallback(async () => {
    const inbox = await getUserInbox(user?.uid as string)
    setInboxMessages(inbox)
  }, [])

  useEffect(() => {
    navigation.addListener('focus', fetchInbox)

    const inboxRef = firebase.database().ref(`inbox/${user?.uid}`)
    inboxRef.on('value', fetchInbox)
  
    return () => {
      inboxRef.off('value', fetchInbox)
    }
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
            onPress={() => router.push({
              pathname: 'chat',
              params: {
                chatId: inboxMessage.chatId,
                currentUserId: user?.uid,
                otherUserId: inboxMessage.otherUser.id,
                otherUserName: inboxMessage.otherUser.name,
                otherUserAvatar: encodeURIComponent(inboxMessage.otherUser.photoURL),
                otherUserStatus: inboxMessage.otherUser.status,
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
                source={{ uri: inboxMessage.otherUser.photoURL }}
                alt='Avatar'
                size={12}
                borderRadius='full'
              />
              <VStack flex={1} space={2}>
                <HStack justifyContent='space-between'>
                  <Heading fontSize={16}>{inboxMessage.otherUser.name}</Heading>
                  <Text fontSize={12}>{
                    new Date(inboxMessage.timestamp).toLocaleDateString('pt-BR', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })
                  }</Text>
                </HStack>
                <HStack justifyContent='space-between'>
                  <Text isTruncated>{inboxMessage.message}</Text>
                  {!isMessageRead(inboxMessage) && (
                    <Box 
                      bg='primary.500'
                      borderRadius='full'
                      size={2}
                    />
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  )
}

