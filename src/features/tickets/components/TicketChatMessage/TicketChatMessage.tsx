import { ReactNode } from 'react'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { theme } from '@data/theme'
import { TICKET_CHAT_OFFSET_LEFT } from '@features/tickets/constants'
import { DisplaySettings, Person } from '@mui/icons-material'
import { Avatar, Box, Card, Typography } from '@mui/material'

export interface TicketChatMessageProps {
  author: null | {
    name: string
    role: string
  }
  content: ReactNode | string
  pictures?: string[]
  status?: ReactNode
  date?: ReactNode
  actions?: ReactNode
}

export const TicketChatMessage = ({ author, content, pictures, status, date, actions }: TicketChatMessageProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '116px 130px 1fr',
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '44px',
          left: `${TICKET_CHAT_OFFSET_LEFT - 4}px`,
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          backgroundColor: (theme) => theme.palette.grey['400'],
        }}
      />
      <Typography
        variant={'body2'}
        color={(theme) => theme.palette.grey['600']}
        sx={{
          marginTop: '32px',
          fontSize: '12px',
          wordSpacing: '4px',
        }}
      >
        {date ?? (
          <>
            26.02.2024
            <br/>
            14:00, вторник
          </>
        )}
      </Typography>
      <Box
        sx={{
          marginTop: '36px',
        }}
      >
        {status ?? <ChipStatus />}
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Avatar
            sx={{
              width: '24px',
              height: '24px',
            }}
            alt={author?.name ?? 'Система'}
          >
            {!author ? <DisplaySettings fontSize={'small'} /> : <Person fontSize={'small'} />}
          </Avatar>
          <Typography
            variant={'body2'}
          >
            {author?.name ?? 'Система'}
            {author && (
              <Box
                component={'span'}
                sx={{
                  color: (theme) => theme.palette.grey['700'],
                }}
              >
                {`  • ${author.role}`}
              </Box>
            )}
          </Typography>
        </Box>
        <Card
          elevation={0}
          sx={{
            position: 'relative',
            overflow: 'visible',
            background: theme.palette.background.paper,
            padding: '8px 16px 12px 12px',
            borderRadius: '8px 8px 8px 0',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: '-10px',
              bottom: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 0 10px 10px',
              borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
              transform: 'rotate(0deg)',
            }}
          />
          <Typography variant={'body2'}>
            {content}
          </Typography>
        </Card>
        {pictures && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {pictures.map((picture, index) => (
              <Box
                key={index}
                sx={{
                  aspectRatio: 1,
                  backgroundImage: `url(${picture})`,
                  backgroundSize: 'cover',
                }}
              />
            ))}
          </Box>
        )}
        {actions && (
          <Box
            sx={{
              display: 'grid',
              gap: '8px',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  )
}
