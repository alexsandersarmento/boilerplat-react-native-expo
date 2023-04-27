import React from 'react'
import { Button, Center, VStack } from 'native-base'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import Form from '../../components/Form'
import { useAuth } from '../../hooks/useAuth'

const userSchema = z.object({
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

  const handleLogin = (data: TUserData) => {
    login(data)
  }

  return (
    <Center flex={1} bg='muted.50'>
      <VStack space={2} w='90%'>
        <FormProvider {...userForm}>
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
          Sign Up
        </Button>
      </VStack>
    </Center>
  )
}
