import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IChatMessage, Bubble, BubbleProps } from 'react-native-gifted-chat'
import { useColorModeValue, useTheme } from 'native-base'
import { useSearchParams } from 'expo-router'

import { getChatMessages, sendMessage } from '../../services'

interface IMessage {
  senderId: string
  receiverId: string
  message: string
  timestamp: number
}

export default function Chat() {
  const [messages, setMessages] = useState<IChatMessage[]>([])
  const { colors } = useTheme()
  const { currentUserId, receiverId } = useSearchParams()

  const formatMessages = (chatMessages: IMessage[]) => {
    const formattedMessages: IChatMessage[] = chatMessages.map((message) => {
      return {
        _id: message.timestamp.toString(),
        text: message.message,
        createdAt: new Date(message.timestamp),
        user: {
          _id: message.senderId,
        },
      }
    })
    return formattedMessages
  }

  useEffect(() => {
    const fetchChatMessages = async () => {
      const chatMessages = await getChatMessages({
        senderId: currentUserId as string,
        receiverId: receiverId as string,
      })

      if (!chatMessages) return

      const formattedMessages = formatMessages(chatMessages)
      
      setMessages(formattedMessages.sort((a, b) => Number(b.createdAt) - Number(a.createdAt)))
    }

    if (currentUserId && receiverId) {
      fetchChatMessages()
    }
  }, [currentUserId, receiverId])

  const onSend = useCallback(async (newMessages: IChatMessage[] = []) => {
    const newMessage = newMessages[0]

    await sendMessage({
      senderId: currentUserId as string,
      receiverId: receiverId as string,
      message: newMessage.text,
    })

    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }, [currentUserId, receiverId])

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
      renderBubble={props => <CustomBubble {...props} />}
      timeFormat='HH:mm'
      dateFormat='ll'
      renderAvatar={() => null}
      messagesContainerStyle={{
        backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
      }}
      user={{
        _id: currentUserId as string,
      }}
    />
  )
}
