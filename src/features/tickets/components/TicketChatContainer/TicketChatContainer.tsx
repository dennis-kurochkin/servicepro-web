import { PropsWithChildren, useLayoutEffect, useRef } from 'react'
import { theme } from '@data/theme'
import { TICKET_CHAT_INSET, TICKET_CHAT_OFFSET_LEFT } from '@features/tickets/constants'
import { Box } from '@mui/material'

interface TicketChatContainerProps extends PropsWithChildren {}

export const TicketChatContainer = ({ children }: TicketChatContainerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    console.log(containerRef?.current?.scrollHeight)
    if (containerRef?.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [containerRef?.current?.scrollHeight])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        backgroundColor: theme.palette.grey['200'],
      }}
    >
      <Box
        ref={containerRef}
        id={'container'}
        sx={{
          position: 'relative',
          display: 'flex',
          gap: '16px',
          flexDirection: 'column-reverse',
          padding: `${TICKET_CHAT_INSET + 20}px ${TICKET_CHAT_INSET}px ${TICKET_CHAT_INSET}px`,
          marginTop: 'auto',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: `${TICKET_CHAT_OFFSET_LEFT + TICKET_CHAT_INSET}px`,
            top: '0px',
            width: '1px',
            height: `calc(100% - ${TICKET_CHAT_INSET}px)`,
            background: (theme) => theme.palette.grey['300'],
          }}
        />
        {children}
      </Box>
    </Box>
  )
}
