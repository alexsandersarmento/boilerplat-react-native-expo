import React from 'react'
import { Button, Center, VStack, Image, IconButton, HStack, useColorModeValue, useTheme } from 'native-base'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Form from '../../components/Form'
import { useAuth } from '../../hooks/useAuth'
import { createUser } from '../../services'

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
  confirmPassword: z.string().nonempty({
    message: 'The confirm password is required',
  }).min(6, {
    message: 'The confirm password must be at least 6 characters',
  }).default(''),
  profileAvatar: z.string().nonempty({
    message: 'The profile avatar is required',
  }).default(''),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match',
      path: ['confirmPassword'],
    })
  }
})

export type TUserData = z.infer<typeof userSchema>

export default function SignUp() {
  const userForm = useForm<TUserData>({
    resolver: zodResolver(userSchema),
  })
  const { login } = useAuth()
  const { colors } = useTheme()

  const { handleSubmit, formState: { isSubmitting }, register, setValue } = userForm

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      register('profileAvatar')
      setValue('profileAvatar', result.assets[0].uri)
    }
  }

  const handleCreate = async (data: TUserData) => {
    return createUser({
      data,
      onSuccess: login,
    })
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
          <Form.Field w='full'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Input name='confirmPassword' type='password'/>
            <Form.ErrorMessage field='confirmPassword' />
          </Form.Field>
          <Form.Field w='full'>
            <Form.Label>Profile Avatar</Form.Label>
            <HStack space={4} alignItems='center'>
              <IconButton
                icon={<MaterialCommunityIcons name='image' size={24} color={useColorModeValue(colors.gray[800], colors.muted[50])} />}
                onPress={pickImage}
                variant='outline'
                w={12}
                _pressed={{
                  bg: 'muted.50',
                  opacity: 0.5,
                }}
              />
              <Image
                source={{ uri: userForm.watch('profileAvatar') }}
                alt='Profile Avatar'
                size={50}
                resizeMode='contain'
              />
            </HStack>
            <Form.ErrorMessage field='profileAvatar' />
          </Form.Field>
        </FormProvider>
        <Button onPress={handleSubmit(handleCreate)} isLoading={isSubmitting} w='full'>
          Sign Up
        </Button>
      </VStack>
    </Center>
  )
}
