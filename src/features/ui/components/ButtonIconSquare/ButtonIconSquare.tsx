import { PropsWithChildren } from 'react'
import { Button, ButtonProps } from '@mui/material'

interface ButtonContextActionsProps extends Pick<ButtonProps, 'onClick'> {
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  disabled?: ButtonProps['disabled']
}

export const ButtonIconSquare = ({ children, variant = 'contained', color = 'primary', disabled, onClick }: PropsWithChildren<ButtonContextActionsProps>) => {
  return (
    <Button
      color={color}
      variant={variant}
      size={'large'}
      disabled={disabled}
      sx={{
        width: '42px',
        minWidth: '42px',
        height: '40px',
        padding: 0,
      }}
      disableElevation
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
