import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

interface TicketDrawerFooterProps extends PropsWithChildren {}

export const TicketDrawerFooter = ({ children }: TicketDrawerFooterProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        boxShadow: 2,
        zIndex: 10,
        padding: '16px 16px 24px',
      }}
    >
      {children}
    </Box>
  )
}
