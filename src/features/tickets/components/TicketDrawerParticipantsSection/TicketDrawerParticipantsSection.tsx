import { useState } from 'react'
import { ButtonIcon } from '@components/ButtonIcon'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { DialogEngineerAssign } from '@features/shared/components/DialogEngineerAssign'
import { ticketStatusesEngineerEditable } from '@features/tickets/data'
import { ManageAccounts } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { Profile, StatusEnum } from '~/api/servicepro.generated'

interface TicketDrawerEngineerSectionProps {
  ticketID: number
  status: StatusEnum
  engineer: Profile | null
  coordinator: Profile | null
}

export const TicketDrawerParticipantsSection = ({ engineer, status, ticketID }: TicketDrawerEngineerSectionProps) => {
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
        display: 'grid',
        gap: '12px',
        padding: '16px 16px 16px',
        background: (theme) => theme.palette.grey['100'],
      }}
    >
      <Typography
        variant={'h6'}
        sx={{ marginBottom: '-4px' }}
      >
        Участники
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: '4px',
        }}
      >
        <Typography
          variant={'subtitle2'}
        >
          Инженер
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '4px',
          }}
        >
          <EngineerAvatar
            profile={engineer ?? null}
          />
          {ticketStatusesEngineerEditable.some((value) => value === status) && (
            <ButtonIcon
              Icon={ManageAccounts}
              fontSize={'18px'}
              onClick={handleOpenDialog}
            />
          )}
        </Box>
      </Box>
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    display: 'grid',*/}
      {/*    gap: '4px',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Typography*/}
      {/*    variant={'subtitle2'}*/}
      {/*  >*/}
      {/*    Координатор*/}
      {/*  </Typography>*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      display: 'flex',*/}
      {/*      gap: '4px',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <EngineerAvatar*/}
      {/*      profile={coordinator ?? null}*/}
      {/*    />*/}
      {/*    <ButtonIcon*/}
      {/*      Icon={ManageAccounts}*/}
      {/*      fontSize={'18px'}*/}
      {/*      onClick={handleOpenDialog}*/}
      {/*    />*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      <DialogEngineerAssign
        open={open}
        selectedTaskID={ticketID}
        onClose={handleCloseDialog}
      />
    </Box>
  )
}
