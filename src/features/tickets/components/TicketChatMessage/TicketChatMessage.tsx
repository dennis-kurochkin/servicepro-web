import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { theme } from '@data/theme'
import { TICKET_CHAT_OFFSET_LEFT } from '@features/tickets/constants'
import { DisplaySettings, Person } from '@mui/icons-material'
import { Avatar, Box, Card, Typography } from '@mui/material'

export interface TicketChatMessageProps {
  author?: string
}

export const TicketChatMessage = ({ author = 'system' }: TicketChatMessageProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '130px 130px 1fr',
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
        26.02.2024
        <br/>
        14:00, вторник
      </Typography>
      <Box
        sx={{
          marginTop: '36px',
        }}
      >
        <ChipStatus />
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
            alt={author}
          >
            {author === 'system' ? <DisplaySettings fontSize={'small'} /> : <Person fontSize={'small'} />}
          </Avatar>
          <Typography
            variant={'body2'}
          >
            {author === 'system' ? 'Система' : 'Иванов Иван'}
            {author !== 'system' && (
              <Box
                component={'span'}
                sx={{
                  color: (theme) => theme.palette.grey['700'],
                }}
              >
                {'  • Инженер'}
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at deserunt dolore labore, modi nobis nulla numquam, omnis optio perspiciatis placeat qui sunt? Ab aliquam amet architecto atque consectetur cum dolorem eaque est id illum in molestias obcaecati, quaerat quam quis, quisquam repudiandae, sed sit voluptas voluptatibus. Ipsa, nesciunt, possimus!
          </Typography>
        </Card>
      </Box>
    </Box>
  )
}
