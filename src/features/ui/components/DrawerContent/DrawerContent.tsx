import { PropsWithChildren, ReactNode } from 'react'
import { DrawerHeader } from '@components/DrawerHeader'
import { TicketDrawerFooter } from '@features/tickets/components/TicketDrawerFooter'
import { Box, SxProps } from '@mui/material'

interface TicketDrawerContentProps {
  title: string
  sx?: SxProps
  innerSx?: SxProps
  renderFooter?: ReactNode
  onClose: () => void
}

export const DrawerContent = ({ title, sx, innerSx, renderFooter, onClose, children }: PropsWithChildren<TicketDrawerContentProps>) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateRows: 'min-content 1fr max-content',
        padding: '0',
        height: '100vh',
        minWidth: '550px',
        ...(sx ?? {}),
      }}
    >
      <DrawerHeader
        title={title}
        onClose={onClose}
      />
      <Box
        sx={{
          padding: '20px 16px',
          overflow: 'hidden',
          ...(innerSx ?? {}),
        }}
      >
        {children}
      </Box>
      {renderFooter && (
        <TicketDrawerFooter>
          {renderFooter}
        </TicketDrawerFooter>
      )}
    </Box>
  )
}
