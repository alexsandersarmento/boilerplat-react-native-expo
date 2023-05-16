import React from 'react'
import { HStack, VStack, Image, Text, Icon, useColorModeValue } from 'native-base'
import { useSearchParams, useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ChatHeader() {
  const params = useSearchParams()
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        safeAreaTop
        bg={useColorModeValue('muted.50', 'gray.800')}
        px={4}
        py={2}
      >
        <Icon
          size={8}
          as={<MaterialCommunityIcons name="chevron-left" />}
          onPress={handleGoBack}
        />
        <VStack>
          <HStack alignItems='center' >
            <Image
              source={{ uri: decodeURIComponent(params.otherUserAvatar as string) }}
              alt='Avatar'
              size={8}
              borderRadius='full'
            />
            <Text ml={2} fontSize={16} fontWeight='bold'>
              {params.otherUserName}
            </Text>
          </HStack>
          <Text fontSize={12} color='muted.400'>
            {params.otherUserStatus}
          </Text>
        </VStack>
        <Icon size="sm" />
      </HStack>
  )
}
