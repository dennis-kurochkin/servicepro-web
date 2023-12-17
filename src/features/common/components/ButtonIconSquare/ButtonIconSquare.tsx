import { PropsWithChildren } from 'react'
import { Button, ButtonProps } from '@mui/material'

interface ButtonContextActionsProps extends Pick<ButtonProps, 'onClick'> {}

export const ButtonIconSquare = ({ children, onClick }: PropsWithChildren<ButtonContextActionsProps>) => {
  return (
    <Button
      color={'primary'}
      variant={'contained'}
      size={'large'}
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
