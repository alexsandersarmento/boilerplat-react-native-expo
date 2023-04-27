import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Text } from 'native-base'

interface ErrorMessageProps {
  field: string
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  
  return result
}

export function ErrorMessage({ field, ...props }: ErrorMessageProps) {
  const { formState: { errors } } = useFormContext()

  const fieldError = get(errors, field)
    
  if (!fieldError) {
    return null
  }

  return (
    <Text color='red.500' {...props}>{fieldError.message?.toString()}</Text>
  )
}
