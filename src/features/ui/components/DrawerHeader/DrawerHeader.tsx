import { Close } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

interface TicketDrawerHeaderProps {
  title: string
  onClose: () => void
}

export const DrawerHeader = ({ title, onClose }: TicketDrawerHeaderProps) => {
  return (
    <Box
      sx={{
        padding: '12px 16px 12px',
        boxShadow: 1,
        zIndex: 10,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant={'h6'}
          fontWeight={500}
        >
          {title}
        </Typography>
        <IconButton
          size={'small'}
          aria-label="close"
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </Box>
    </Box>
  )
}
