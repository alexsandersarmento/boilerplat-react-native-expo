import React, { forwardRef } from 'react'
import { Text, Pressable, IPressableProps } from 'native-base'

interface DrawerItemProps extends IPressableProps {
  title: string
}

const DrawerItem = forwardRef<IPressableProps, DrawerItemProps>(
  ({ title, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        px={4}
        py={2}
        bg="transparent"
        _pressed={{ bg: 'gray.200' }}
        {...props}
      >
        <Text fontSize="lg">
          {title}
        </Text>
      </Pressable>
    )
  },
)

DrawerItem.displayName = 'DrawerItem'

export default DrawerItem
