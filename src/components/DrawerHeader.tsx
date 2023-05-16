import React from 'react'
import { HStack, Icon, Text, useColorModeValue } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface DrawerHeaderProps {
  title: string
}

export default function DrawerHeader({ title } : DrawerHeaderProps) {
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
      <Text fontSize="lg" fontWeight="bold" color={useColorModeValue('gray.800', 'muted.50')}>
        {title}
      </Text>
      <Icon size="sm" />
    </HStack>
  )
}
  
