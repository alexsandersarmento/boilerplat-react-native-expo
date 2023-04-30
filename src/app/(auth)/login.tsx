import React, { useState,  useEffect } from 'react'
import { Button, Center, VStack, useColorModeValue } from 'native-base'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'expo-router'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import GoogleSigninButton from '../../components/GoogleSigninButton'
import Form from '../../components/Form'
import { useAuth } from '../../hooks/useAuth'

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

type TLoginData = z.infer<typeof loginSchema>

export default function Login() {
  const [isGoogleSigninLoading, setIsGoogleSigninLoading] = useState(false)

  const loginForm = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  })

  const navigation = useRouter()

  const { login } = useAuth()

  const { handleSubmit, formState: { isSubmitting } } = loginForm

  const handleLogin = async (data: TLoginData) => {
    try {
      const { user } = await auth().signInWithEmailAndPassword(data.email, data.password)
      login(user)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      setIsGoogleSigninLoading(true)

      await GoogleSignin.hasPlayServices()
      const { idToken } = await GoogleSignin.signIn()
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      const { user } = await auth().signInWithCredential(googleCredential)

      login(user)
    } catch (error) {
      console.error(error)
    } finally {
      setIsGoogleSigninLoading(false)
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1066131766845-kcon415bejif60epslrb86bkbmgm2mg4.apps.googleusercontent.com',
    })
  }, [])

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
