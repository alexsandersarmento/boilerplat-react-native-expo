import React from 'react'
import { Pressable, Center, Text, Image, useColorModeValue, IButtonProps, Spinner } from 'native-base'

export default function GoogleSigninButton(props: IButtonProps) {
  const bg = useColorModeValue('white', 'gray.700')
  
  return (
    <Pressable 
      _pressed={{
        opacity: 0.5,
      }}
      {...props}
    >
      <Center
        w='full'
        h='48px'
        alignItems="center"
        bg={bg}
        borderRadius={4}
        shadow={1}
      >
        {props.isLoading ? <Spinner color='gray.500' /> : (
          <>
            <Image
              source={require('../../assets/icons/google.png')}
              alt="Google"
              size={6}
              position='absolute'
              left={4}
            />
            <Text>
              Sign in with Google
            </Text>
          </>
        )}
      </Center>
    </Pressable>
  )
}
