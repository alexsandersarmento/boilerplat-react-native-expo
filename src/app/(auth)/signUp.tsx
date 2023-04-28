import React from 'react'
import { Button, Center, VStack, useColorModeValue } from 'native-base'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import auth from '@react-native-firebase/auth'

import Form from '../../components/Form'
import { useAuth } from '../../hooks/useAuth'

const userSchema = z.object({
  name: z.string().nonempty({
    message: 'The name is required',
  }).default(''),
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

type TUserData = z.infer<typeof userSchema>

export default function SignUp() {
  const userForm = useForm<TUserData>({
    resolver: zodResolver(userSchema),
  })
  const { login } = useAuth()

  const { handleSubmit, formState: { isSubmitting } } = userForm

  const handleCreate = async (data: TUserData) => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(data.email, data.password)
      await user.updateProfile({
        displayName: data.name,
      })

      login({
        displayName: data.name,
        email: data.email,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Center flex={1} bg={useColorModeValue('gray.50', 'gray.800')}>
      <VStack space={2} w='90%'>
        <FormProvider {...userForm}>
          <Form.Field w='full'>
            <Form.Label>Name</Form.Label>
            <Form.Input name='name' />
            <Form.ErrorMessage field='name' />
          </Form.Field>
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
        <Button onPress={handleSubmit(handleCreate)} isLoading={isSubmitting} w='full'>
          Sign Up
        </Button>
      </VStack>
    </Center>
  )
}
