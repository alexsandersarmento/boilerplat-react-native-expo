import React, { useState, useEffect } from 'react'
import { GiftedChat, IChatMessage, Bubble, BubbleProps, Send } from 'react-native-gifted-chat'
import { Box, Icon, useColorModeValue, useTheme } from 'native-base'
import { useSearchParams, useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { firebase } from '../../../services/firebase'
import { getChatMessages, sendMessage, markMessageAsRead } from '../../../services'
import { generateChatId } from '../../../utils'

interface IMessage {
  id: string
  senderId: string
  receiverId: string
  message: string
  timestamp: number
  read: boolean
}

export default function Chat() {
  const [messages, setMessages] = useState<IChatMessage[]>([])

  const { colors } = useTheme()
  const { currentUserId, otherUserId, chatId } = useSearchParams()
  const router = useRouter()

  const formatMessages = (chatMessages: IMessage[]) => {
    const formattedMessages = chatMessages.map((message) => {
      return {
        _id: message.id,
        text: message.message,
        createdAt: message.timestamp,
        user: {
          _id: message.senderId,
          name: message.senderId,
        },
        read: message.read,
      }
    })
    return formattedMessages
  }

  const fetchChatMessages = async () => {
    const chatMessages = await getChatMessages({
      chatId: chatId as string,
      currentUserId: currentUserId as string,
      receiverId: otherUserId as string,
    })
    if (!chatMessages) return

    const formattedMessages = formatMessages(chatMessages)
    setMessages(formattedMessages.sort((a, b) => Number(b.createdAt) - Number(a.createdAt)))
    const unreadMessages = formattedMessages.filter(message => message.user._id !== currentUserId && !message.read)
    unreadMessages.forEach(message => markMessageAsRead({
      userId: currentUserId as string,
      chatId: chatId as string,
      messageId: message._id,
    }))
  }

  useEffect(() => {
    let currentChatId = chatId as string
    if (!currentChatId) {
      currentChatId = generateChatId({
        userId1: currentUserId as string,
        userId2: otherUserId as string,
      })
    }

    const inboxRef = firebase.database().ref(`chats/${currentChatId}/messages`)
    inboxRef.orderByChild('timestamp').limitToLast(1).on('child_added', fetchChatMessages)
    const usersRef = firebase.database().ref(`users/${otherUserId}`)
    usersRef.on('child_changed', snapshot => {
      if (snapshot.key === 'status') {
        router.setParams({
          otherUserStatus: snapshot.val(),
        })
      }
    })

    return () => {
      inboxRef.off('child_added', fetchChatMessages)
    }
  }, [])

  const onSend = async (newMessages: IChatMessage[] = []) => {
    const newMessage = newMessages[0]

    await sendMessage({
      senderId: currentUserId as string,
      receiverId: otherUserId as string,
      message: newMessage.text,
    })
  }

  const CustomBubble = (props: BubbleProps<IChatMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: useColorModeValue(colors.gray[800], colors.gray[50]),
          },
          right: {
            backgroundColor: colors.primary[500],
          },
        }}
        textStyle={{
          left: {
            color: useColorModeValue(colors.muted[50], colors.gray[800]),
          },
          right: {
            color: colors.muted[50],
          },
        }}
      />
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      timeFormat='HH:mm'
      dateFormat='ll'
      showAvatarForEveryMessage={true}
      minComposerHeight={80}
      isLoadingEarlier
      renderAvatar={() => null}
      renderBubble={props => <CustomBubble {...props} />}
      renderSend={(props) => {
        return (
          <Box alignSelf='flex-start' >
            <Send
              {...props}
              containerStyle={{
                justifyContent: 'center',
              }}
            >
              <Icon
                as={<MaterialCommunityIcons name='send' />}
                size={8}
                color={colors.primary[500]}
              />
            </Send>
          </Box>
        )
      }}
      messagesContainerStyle={{
        backgroundColor: useColorModeValue(colors.muted[50], colors.gray[800]),
        paddingBottom: 50,
      }}
      user={{
        _id: currentUserId as string,
      }}
    />
  )
}
