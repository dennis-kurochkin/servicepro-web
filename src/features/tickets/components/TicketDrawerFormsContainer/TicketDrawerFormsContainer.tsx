import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

interface TicketDrawerFormsContainerProps extends PropsWithChildren {}

export const TicketDrawerFormsContainer = ({ children }: TicketDrawerFormsContainerProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'repeat(4, max-content)',
        overflowY: 'auto',
      }}
    >
      {children}
    </Box>
  )
}
