import React, { useEffect } from 'react'
import { ScrollView, VStack, HStack, Pressable, Image, Heading, Center, useColorModeValue } from 'native-base'
import { useRouter, useNavigation } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '@store'
import { setAvailableUsers, setIsLoading } from '@reducers'
import { useAuth } from '@hooks'
import { getUsers } from '@services'

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

interface ILobbyState {
  availableUsers: IAvailableUser[] | []
}

export default function Lobby() {
  const { availableUsers }: ILobbyState = useSelector((state: RootState) => state.lobby)
  const { isLoading } = useSelector((state: RootState) => state.loading)
  const dispatch = useDispatch()
  const { user } = useAuth()
  const router = useRouter()
  const navigation = useNavigation()

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
    dispatch(setAvailableUsers(processedUsers.filter((processedUser) => processedUser.id !== user?.uid)))
    dispatch(setIsLoading(false))
  }

  const fetchUsers = async () => {
    dispatch(setIsLoading(true))
    const users = await getUsers()
    processUsersData(users)
  }

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', fetchUsers)
    fetchUsers()

    return () => {
      unsubscribeFocus()
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
    <ScrollView
      flex={1}
      p={4}
      bg={useColorModeValue('muted.50', 'gray.800')}
    >
      <VStack flex={1} space={4}>
        {availableUsers.map((availableUser, index) => (
          <Pressable
            key={index}
            onPress={() => router.push({
              pathname: 'chat',
              params: {
                currentUserId: user?.uid,
                otherUserId: availableUser.id,
                otherUserName: availableUser.name,
                otherUserAvatar: encodeURIComponent(availableUser.photoURL),
                otherUserStatus: availableUser.status,
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

