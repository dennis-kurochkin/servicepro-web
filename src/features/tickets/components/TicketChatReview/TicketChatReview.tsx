import { Star } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

interface TicketChatReviewProps {
  value: number
  text: string
}

export const TicketChatReview = ({ value, text }: TicketChatReviewProps) => {
  const starsFilled = value >= 5 ? 5 : Math.floor(value)
  const starsUnfilled = 5 - starsFilled

  return (
    <Box
      sx={{
        marginLeft: '120px',
        padding: '12px 12px 16px',
        background: (theme) => theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: starsFilled }).map((_, index) => (
          <Star
            key={index}
            sx={{
              color: (theme) => theme.palette.warning.light,
            }}
          />
        ))}
        {Array.from({ length: starsUnfilled }).map((_, index) => (
          <Star
            key={index}
            sx={{
              color: (theme) => theme.palette.grey['300'],
            }}
          />
        ))}
      </Box>
      <Typography
        variant={'body2'}
        sx={{
          textAlign: 'center',
          marginTop: '8px',
        }}
      >
        {text || 'Отзыв от клиента'}
      </Typography>
    </Box>
  )
}
