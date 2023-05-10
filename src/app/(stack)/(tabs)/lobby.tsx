import React, { useState, useEffect } from 'react'
import { ScrollView, VStack, HStack, Pressable, Image, useColorModeValue, Heading } from 'native-base'
import { useRouter } from 'expo-router'

import { useAuth } from '../../../hooks/useAuth'
import { getUsers } from '../../../services'

interface IUserData {
  email: string
  name: string
  photoURL: string
  status: string
}

interface IUsersData {
  [userId: string]: IUserData
}

interface IAvailableUser {
  id: string
  email: string
  name: string
  photoURL: string
  status: string
}

export default function Lobby() {
  const [availableUsers, setAvailableUsers] = useState<IAvailableUser[] | []>([])

  const { user } = useAuth()

  const navigation = useRouter()

  const processUsersData = (usersData: IUsersData) => {
    const processedUsers = Object.keys(usersData).map((userId) => {
      const processedUser = usersData[userId]
      return {
        id: userId,
        email: processedUser.email,
        name: processedUser.name,
        photoURL: processedUser.photoURL,
        status: processedUser.status,
      }
    })

    setAvailableUsers(processedUsers.filter((processedUser) => processedUser.id !== user?.uid))
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers()
      processUsersData(users)
    }
    fetchUsers()
  }, [])

  return (
    <ScrollView
      flex={1}
      p={4}
      bg={useColorModeValue('muted.50', 'gray.800')}
    >
      <VStack flex={1} space={4}>
        {availableUsers.map((availableUser, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.push({
              pathname: 'chat',
              params: {
                currentUserId: user?.uid,
                receiverId: availableUser.id,
                receiverName: availableUser.name,
                receiverAvatar: encodeURIComponent(availableUser.photoURL),
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
                source={{ uri: availableUser.photoURL }}
                alt='Avatar'
                size={12}
                borderRadius='full'
              />
              <VStack flex={1} space={2}>
                <HStack justifyContent='space-between'>
                  <Heading fontSize={16}>{availableUser.name}</Heading>
                </HStack>
              </VStack>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  )
}

