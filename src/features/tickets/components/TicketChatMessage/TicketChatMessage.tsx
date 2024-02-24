import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { theme } from '@data/theme'
import { DisplaySettings, Person } from '@mui/icons-material'
import { Avatar, Box, Card, Typography } from '@mui/material'

export interface TicketChatMessageProps {
  type: 'from' | 'to'
  author?: string
}

export const TicketChatMessage = ({ type, author = 'system' }: TicketChatMessageProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '8px',
        ...(type === 'from' ? {
          paddingRight: '10%',
        } : {
          paddingLeft: '15%',
        }),
      }}
    >
      {type === 'from' && (
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
      )}
      <Card
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'visible',
          background: theme.palette.background.paper,
          padding: '8px 16px 12px 12px',
          borderRadius: type === 'from' ? '8px 8px 8px 0' : '8px 8px 0 8px',
        }}
      >
        {type === 'to' ? (
          <Box
            sx={{
              position: 'absolute',
              right: '-10px',
              bottom: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '10px 0 0 10px',
              borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
              transform: 'rotate(0deg)',
            }}
          />
        ) : (
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
        )}
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at deserunt dolore labore, modi nobis nulla numquam, omnis optio perspiciatis placeat qui sunt? Ab aliquam amet architecto atque consectetur cum dolorem eaque est id illum in molestias obcaecati, quaerat quam quis, quisquam repudiandae, sed sit voluptas voluptatibus. Ipsa, nesciunt, possimus!
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
          }}
        >
          <ChipStatus />
          <Typography
            variant={'body2'}
            color={(theme) => theme.palette.grey['600']}
            sx={{ wordSpacing: '4px' }}
          >
            26.02.2024 14:00, вторник
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}
