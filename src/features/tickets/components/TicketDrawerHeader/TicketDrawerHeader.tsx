import { ReactNode } from 'react'
import { Close } from '@mui/icons-material'
import { Box, IconButton, Skeleton, Typography } from '@mui/material'

interface TicketDrawerHeaderProps {
  title: string
  loading?: boolean
  renderChips: ReactNode
  onClose: () => void
}

export const TicketDrawerHeader = ({ title, loading = false, renderChips, onClose }: TicketDrawerHeaderProps) => {
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
        {loading ? (
          <Skeleton
            variant={'rounded'}
            height={24}
            width={'30%'}
          />
        ) : (
          <Typography
            variant={'h6'}
            fontWeight={500}
          >
            {title}
          </Typography>
        )}
        <IconButton
          size={'small'}
          aria-label="close"
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
          marginTop: '4px',
        }}
      >
        {!loading ? renderChips : (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                variant={'rounded'}
                height={24}
                width={'100px'}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  )
}
