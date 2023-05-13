import React from 'react'
import { HStack, VStack, Image, Text, Pressable, Icon, Center, useTheme } from 'native-base'
import { useSearchParams, useRouter } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChatHeader() {
  const params = useSearchParams()
  const router = useRouter()
  const { colors } = useTheme()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.muted[50],
    }}>
      <Center
        height='70px'
        bg='muted.50'
      >
        <Pressable 
          onPress={handleGoBack} 
          position='absolute'
          left={4}
        >
          <Icon as={<Entypo name="chevron-thin-left"/>} size={6}/>
        </Pressable>
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
      </Center>
    </SafeAreaView>
  )
}
