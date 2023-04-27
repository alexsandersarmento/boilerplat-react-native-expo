import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input as NativeBaseInput, IInputProps } from 'native-base'

interface InputProps extends IInputProps {
  name: string
}

export function Input({ name, ...props }: InputProps) {
  const { register, setValue } = useFormContext()

  return (
    <NativeBaseInput
      onChangeText={text => setValue(name, text)}
      {...register(name)}
      {...props}
    />
  )
}
