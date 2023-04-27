import React from 'react'
import { VStack, IStackProps } from 'native-base'

export function Field({ children, ...props } : IStackProps ) {
  return (
    <VStack space={2} {...props}>
      {children}
    </VStack>
  )
}
