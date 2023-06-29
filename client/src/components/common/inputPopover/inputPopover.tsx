import { Text, Popover } from '@nextui-org/react'
import React from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  error: FieldError | undefined
  children: React.ReactNode
}

const InputPopover = ({ error, children }: Props) => {
  return (
    <Popover
      isOpen={error?.message ? true : false}
      isDismissable={false}
      placement='bottom-right'
      
    >
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Content css={{ p: '$5', background: '$error' }}>
        <Text color='white' >{error?.message}</Text>
      </Popover.Content>
    </Popover>
  )
}

export default InputPopover