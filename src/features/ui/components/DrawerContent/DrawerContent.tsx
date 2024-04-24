import { PropsWithChildren, ReactNode } from 'react'
import { DrawerHeader } from '@components/DrawerHeader'
import { TicketDrawerFooter } from '@features/tickets/components/TicketDrawerFooter'
import { Box, BoxProps, styled, SxProps } from '@mui/material'

const ContentWrapper = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  display: 'grid',
  gridTemplateRows: 'min-content 1fr max-content',
  padding: '0',
  width: '80vw',
  maxWidth: '1200px',
  minWidth: '550px',
  height: '100vh',
}))

interface TicketDrawerContentProps {
  title: string
  sx?: SxProps
  renderFooter: ReactNode
  onClose: () => void
}

export const DrawerContent = ({ title, sx, renderFooter, onClose, children }: PropsWithChildren<TicketDrawerContentProps>) => {
  return (
    <ContentWrapper>
      <DrawerHeader
        title={title}
        onClose={onClose}
      />
      <Box
        sx={{
          padding: '20px 16px',
          overflow: 'hidden',
          ...(sx ?? {}),
        }}
      >
        {children}
      </Box>
      <TicketDrawerFooter>
        {renderFooter}
      </TicketDrawerFooter>
    </ContentWrapper>
  )
}
