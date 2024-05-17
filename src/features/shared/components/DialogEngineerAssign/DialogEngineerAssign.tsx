import { FormEvent, useMemo, useState } from 'react'
import { FieldAutocomplete } from '@components/Field'
import { FieldAutocompleteCommonValue } from '@components/Field/components/FieldAutocomplete/types'
import { getEngineerLabel } from '@features/engineers/helpers'
import { QueryKey } from '@features/shared/data'
import { useQueryEngineers } from '@features/shared/hooks/useQueryEngineers'
import { useApi } from '@hooks/useApi'
import { useEmployment } from '@hooks/useEmployment'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '~/api'

interface DialogEngineerAssignProps {
  open: boolean
  selectedTaskID: number
  onClose: () => void
}

export const DialogEngineerAssign = ({ open, selectedTaskID, onClose }: DialogEngineerAssignProps) => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { data: employment } = useEmployment()
  const { notify } = useNotify()

  const { data, isLoading } = useQueryEngineers()
  const [value, setValue] = useState<FieldAutocompleteCommonValue | null>(null)
  const options = useMemo((): FieldAutocompleteCommonValue[] => data?.map((engineer) => ({
    name: `${getEngineerLabel(engineer.profile, false)} (4.3)`,
    id: engineer.id,
  })) ?? [], [data])

  const mutation = useMutation({
    mutationFn: async () => {
      const engineer = data?.find(({ id }) => id === value?.id)

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

        handleClose()
      } catch (error) {
        notify({
          message: 'Произошла ошибка при назначении инженера',
          variant: 'error',
        })
      } finally {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [QueryKey.Ticket] }),
          queryClient.invalidateQueries({ queryKey: [QueryKey.TicketsGeos] }),
        ])
      }
    },
  })

  const handleClose = () => {
    setValue(null)
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
      <DialogTitle>Назначить инженера для заявки</DialogTitle>
      <DialogContent>
        <FieldAutocomplete
          name={'engineer'}
          value={value}
          options={options}
          label={'Инженер'}
          isLoading={isLoading}
          onChange={setValue}
        />
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
          onClick={handleClose}
        >
          Отмена
        </Button>
        <Button
          variant={'contained'}
          type="submit"
          disableElevation
        >
          Назначить
        </Button>
      </DialogContent>
    </Dialog>
  )
}
