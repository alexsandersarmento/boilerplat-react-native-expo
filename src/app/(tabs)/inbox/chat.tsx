import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IChatMessage, Bubble, BubbleProps } from 'react-native-gifted-chat'
import {  useColorModeValue, useTheme } from 'native-base'

import { firebase } from '../../../services/firebase'
import { useAuth } from '../../../hooks/useAuth'

export default function HelloWorld() {

  const [messages, setMessages] = useState<IChatMessage[]>([])

  const { colors } = useTheme()
  const { user } = useAuth()

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello world!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/people',
        },
      },
    ])
  }, [])

  useEffect(() => {
    if (!user) return
    const userRef = firebase.database().ref(`users/${'fUeaQv4T9fftlUJ8OuXPvENk4if2'}`)

    userRef.on('value', snapshot => {
      const status = snapshot.val()?.status || 'offline'
      console.log({ status })
    })

    return () => {
      userRef.off('value')
    }
  }, [])

  const onSend = useCallback((message: IChatMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, message))
  }, [])

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
      onSend={message => onSend(message)}
      renderBubble={props => <CustomBubble {...props} />}
      timeFormat='HH:mm'
      dateFormat='ll'
      renderAvatar={() => null}
      messagesContainerStyle={{
        backgroundColor: useColorModeValue(colors.gray[50], colors.gray[800]),
      }}
      user={{
        _id: 1,
      }}
    />
  )
}

