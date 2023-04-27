import React from 'react'
import { Text, ITextProps } from 'native-base'

export function Label( { children, ...props } : ITextProps) {
  return (
    <Text {...props} >{children}</Text>
  )
}
