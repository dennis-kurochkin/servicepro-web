import { ReactNode } from 'react'
import { TicketChipStatus } from '@features/shared/components/TicketChipStatus/TicketChipStatus'
import { Close } from '@mui/icons-material'
import { Box, IconButton, Skeleton, Typography } from '@mui/material'
import { StatusEnum } from '~/api/servicepro.generated'

interface TicketDrawerHeaderProps {
  title: string
  subtitle: string
  status: StatusEnum | null
  loading?: boolean
  renderChips: ReactNode
  onClose: () => void
}

export const TicketDrawerHeader = ({ title, subtitle, status, loading = false, renderChips, onClose }: TicketDrawerHeaderProps) => {
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
          gap: '12px',
        }}
      >
        {loading ? (
          <Skeleton
            variant={'rounded'}
            height={24}
            width={'30%'}
          />
        ) : (
          <>
            {status && (
              <TicketChipStatus
                status={status}
                size={400}
                filled
              />
            )}
            <Typography
              variant={'h6'}
              fontWeight={500}
            >
              {title}
            </Typography>
            <Typography
              variant={'h6'}
              fontWeight={400}
              sx={{ marginLeft: '-4px' }}
            >
              {subtitle}
            </Typography>
          </>
        )}
        <IconButton
          size={'small'}
          aria-label="close"
          sx={{ marginLeft: 'auto' }}
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
