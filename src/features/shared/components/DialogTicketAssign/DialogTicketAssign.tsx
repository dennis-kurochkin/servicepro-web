import { FormEvent, useState } from 'react'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { getEngineerLabel } from '@features/engineers/helpers'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { QueryKey } from '@features/shared/data'
import { useApi } from '@hooks/useApi'
import { useEmployment } from '@hooks/useEmployment'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '~/api'
import { WorkEmployee } from '~/api/servicepro.generated'

interface DialogTicketAssignProps {
  open: boolean
  engineer: WorkEmployee
  onClose: () => void
  onSelectTaskID: (taskID: number) => void
}

export const DialogTicketAssign = ({ open, engineer, onClose, onSelectTaskID }: DialogTicketAssignProps) => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { data: employment } = useEmployment()
  const { notify } = useNotify()

  const [selectedTaskID, setSelectedTaskID] = useState<number>(0)
  const { data } = useQuery({
    queryKey: [QueryKey.TicketsEngineers, organizationID],
    queryFn: async () => {
      const { data: tasks } = await api.workSersTasksVerboseList({
        orgId: organizationID.toString(),
      })

      const result = tasks.filter((task) => task?.executor?.id !== engineer.id)
      setSelectedTaskID(result[0].id)

      return result
    },
    enabled: open,
    refetchOnWindowFocus: false,
  })

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedTaskID || !employment?.profile.id || !engineer) {
        notify({
          message: 'Произошла ошибка при назначении инженера',
          variant: 'error',
        })

        return
      }

      try {
        await api.workSersTasksExecutorsPartialUpdate(selectedTaskID, organizationID.toString(), {
          executor: engineer.id,
        })

        notify({
          message: `${getEngineerLabel(engineer.profile)} успешно назначен инженером заявки`,
          variant: 'success',
        })

        onSelectTaskID(selectedTaskID)
        handleClose()
      } catch (error) {
        notify({
          message: 'Произошла ошибка при назначении инженера',
          variant: 'error',
        })
      } finally {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [QueryKey.Engineers] }),
          queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket] }),
        ])
      }
    },
  })

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await mutation.mutateAsync()

    if (mutation.status === 'success') {
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
      onClose={handleClose}
    >
      <DialogTitle>Назначить заявку на инженера</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <EngineerAvatar
            profile={engineer.profile}
          />
          <TableCellTickets
            selectedTaskID={selectedTaskID}
            tasks={data ?? []}
            disableView
            onChangeSelectedTaskID={setSelectedTaskID}
          />
        </Box>
      </DialogContent>
      <DialogContent
        sx={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant={'outlined'}
          disabled={mutation.isPending}
          onClick={handleClose}
        >
          Отмена
        </Button>
        <LoadingButton
          variant={'contained'}
          type="submit"
          loading={mutation.isPending}
          disableElevation
        >
          Назначить
        </LoadingButton>
      </DialogContent>
    </Dialog>
  )
}
