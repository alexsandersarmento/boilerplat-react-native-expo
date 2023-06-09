import React, { useState } from 'react'
import { Button, Center, VStack, useColorModeValue } from 'native-base'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'expo-router'

import { GoogleSigninButton, Form } from '@components'
import { emailAndPasswordlogin, googleLogin } from '@services'
import { useAuth } from '@hooks'

const loginSchema = z.object({
  email: z.string().email({
    message: 'The email is invalid',
  }).nonempty({
    message: 'The email is required',
  }).default(''),
  password: z.string().nonempty({
    message: 'The password is required',
  }).min(6, {
    message: 'The password must be at least 6 characters',
  }).default(''),
})

export type TLoginData = z.infer<typeof loginSchema>

export default function Login() {
  const [isGoogleSigninLoading, setIsGoogleSigninLoading] = useState(false)

  const loginForm = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  })

  const navigation = useRouter()

  const { login } = useAuth()

  const { handleSubmit, formState: { isSubmitting } } = loginForm

  const handleLogin = async (data: TLoginData) => {
    return emailAndPasswordlogin({
      data,
      onSuccess: login,
    })
  }

  const handleLoginWithGoogle = async () => {
    try {
      setIsGoogleSigninLoading(true)
      await googleLogin()
      login()
    } catch (error) {
      console.error(error)
    } finally {
      setIsGoogleSigninLoading(false)
    }
  }
 
  return (
    <Center flex={1} bg={useColorModeValue('gray.50', 'gray.800')}>
      <VStack space={2} w='90%'>
        <FormProvider {...loginForm}>
          <Form.Field w='full'>
            <Form.Label>Email</Form.Label>
            <Form.Input name='email' />
            <Form.ErrorMessage field='email' />
          </Form.Field>
          <Form.Field w='full'>
            <Form.Label>Password</Form.Label>
            <Form.Input name='password' type='password'/>
            <Form.ErrorMessage field='password' />
          </Form.Field>
        </FormProvider>
        <Button onPress={handleSubmit(handleLogin)} isLoading={isSubmitting} w='full'>
          Login
        </Button>
        <GoogleSigninButton onPress={handleLoginWithGoogle} isLoading={isGoogleSigninLoading}/>
        <Button onPress={() => navigation.push('/signUp')} variant='outline' w='full'>
          Sign Up
        </Button>
      </VStack>
    </Center>
  )
}
