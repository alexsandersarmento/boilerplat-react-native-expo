import React, { useEffect } from 'react'
import { ScrollView, VStack, HStack, Pressable, Text, Image, Heading, Box, Center, useColorModeValue } from 'native-base'
import { useRouter, useNavigation } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { ActivityIndicator } from 'react-native'

import { setInboxMessages, setIsLoading } from '@reducers'
import { RootState } from '@store'
import { firebase } from '@services'
import { getUserInbox } from '@services'
import { useAuth } from '@hooks'

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
  };
}

interface IInboxState {
  inboxMessages: IInboxMessage[];
}

export default function Inbox() {
  const { inboxMessages }: IInboxState = useSelector((state: RootState) => state.inbox)
  const { isLoading } = useSelector((state: RootState) => state.loading)
  const dispatch = useDispatch()

  const { user } = useAuth()
  const router = useRouter()
  const navigation = useNavigation()

  const isMessageRead = (message: IInboxMessage) => {
    if (message.senderId === user?.uid) return true

    return message.read
  }

  const fetchInbox = async () => {
    dispatch(setIsLoading(true))
    const inbox = await getUserInbox(user?.uid as string)
    dispatch(setInboxMessages(inbox))
    dispatch(setIsLoading(false))
  }

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', fetchInbox)

    const inboxRef = firebase.database().ref(`inbox/${user?.uid}`)
    inboxRef.on('value', fetchInbox)

    return () => {
      unsubscribeFocus()
      inboxRef.off('value', fetchInbox)
    }
  }, [])

  if (isLoading) {
    return (
      <Center flex={1} bg={useColorModeValue('muted.50', 'gray.800')}>
        <ActivityIndicator size='large' />
      </Center>
    )
  }

  return (
    <ScrollView flex={1} p={4} bg={useColorModeValue('muted.50', 'gray.800')}>
      <VStack flex={1} space={4}>
        {inboxMessages.map((inboxMessage, index) => (
          <Pressable
            key={index}
            onPress={() =>
              router.push({
                pathname: 'chat',
                params: {
                  chatId: inboxMessage.chatId,
                  currentUserId: user?.uid,
                  otherUserId: inboxMessage.otherUser.id,
                  otherUserName: inboxMessage.otherUser.name,
                  otherUserAvatar: encodeURIComponent(inboxMessage.otherUser.photoURL),
                  otherUserStatus: inboxMessage.otherUser.status,
                },
              })
            }
            width='full'
            height={16}
            _pressed={{
              opacity: 0.5,
            }}
          >
            <HStack flex={1} space={4} alignItems='center'>
              <Image source={{ uri: inboxMessage.otherUser.photoURL }} alt='Avatar' size={12} borderRadius='full' />
              <VStack flex={1} space={2}>
                <HStack justifyContent='space-between'>
                  <Heading fontSize={16}>{inboxMessage.otherUser.name}</Heading>
                  <Text fontSize={12}>
                    {new Date(inboxMessage.timestamp).toLocaleDateString('pt-BR', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Text>
                </HStack>
                <HStack justifyContent='space-between'>
                  <Text isTruncated>{inboxMessage.message}</Text>
                  {!isMessageRead(inboxMessage) && <Box bg='primary.500' borderRadius='full' size={2} />}
                </HStack>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  )
}
