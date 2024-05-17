import { useState } from 'react'
import { ButtonIcon } from '@components/ButtonIcon'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { DialogEngineerAssign } from '@features/shared/components/DialogEngineerAssign'
import { ManageAccounts } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { Profile } from '~/api/servicepro.generated'

interface TicketDrawerEngineerSectionProps {
  ticketID: number
  profile: Profile | null
}

export const TicketDrawerEngineerSection = ({ profile, ticketID }: TicketDrawerEngineerSectionProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

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
      {profile ? (
        <Box
          sx={{
            display: 'flex',
            gap: '4px',
          }}
        >
          <EngineerAvatar
            profile={profile}
          />
          <ButtonIcon
            Icon={ManageAccounts}
            fontSize={'18px'}
            onClick={handleOpenDialog}
          />
        </Box>
      ) : (
        <Button
          variant={'contained'}
          size={'small'}
          color={'info'}
          endIcon={<ManageAccounts fontSize={'small'} />}
          disableElevation
          onClick={handleOpenDialog}
        >
          Назначить
        </Button>
      )}
      <DialogEngineerAssign
        open={open}
        selectedTaskID={ticketID}
        onClose={handleCloseDialog}
      />
    </Box>
  )
}
