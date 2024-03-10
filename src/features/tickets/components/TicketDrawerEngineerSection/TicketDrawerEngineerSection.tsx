import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { ManageAccounts } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'

interface TicketDrawerEngineerSectionProps {
  data: string | null
}

export const TicketDrawerEngineerSection = ({ data }: TicketDrawerEngineerSectionProps) => {
  return (
    <Box
      sx={{
        padding: '16px 16px 16px',
        background: (theme) => theme.palette.grey['100'],
      }}
    >
      <Typography
        variant={'h6'}
        sx={{ marginBottom: '8px' }}
      >
        Инженер
      </Typography>
      {data ? (
        <EngineerAvatar />
      ) : (
        <Button
          variant={'contained'}
          size={'small'}
          color={'info'}
          endIcon={<ManageAccounts fontSize={'small'} />}
          disableElevation
        >
          Назначить
        </Button>
      )}
    </Box>
  )
}
