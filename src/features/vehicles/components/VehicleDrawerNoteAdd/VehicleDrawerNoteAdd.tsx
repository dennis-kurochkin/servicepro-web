import { useState } from 'react'
import { DrawerContent } from '@components/DrawerContent'
import { FieldInput } from '@components/Field'
import { QueryKey } from '@features/shared/data'
import { rr2 } from '@features/ui/types'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Drawer } from '@mui/material'
import { queryClient } from '~/api'

interface VehicleDrawerDocumentationAddProps {
  open: boolean
  vehicleID: number
  onClose: () => void
}

export const VehicleDrawerNoteAdd = ({ open, vehicleID, onClose }: VehicleDrawerDocumentationAddProps) => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { notify } = useNotify()

  const [text, setText] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setTouched(true)

    if (!text || text.length > 500) {
      return
    }

    try {
      setLoading(true)

      await rr2(api.vehicleSersVehiclesNotesCreate)(organizationID.toString(), vehicleID.toString(), {
        text,
      })

      notify({
        message: 'Заметка успешно добавлена',
        variant: 'success',
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.VehicleNotes] })

      setLoading(false)
      handleClose()
    } catch (error) {
      notify({
        message: 'Не удалось добавить заметку',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (loading) {
      return
    }

    setText('')
    setTouched(false)

    onClose()
  }

  return (
    <Drawer
      open={open}
      anchor={'right'}
      onClose={handleClose}
    >
      <DrawerContent
        title={'Добавить заметку'}
        sx={{
          width: '600px',
        }}
        renderFooter={(
          <>
            <LoadingButton
              variant={'contained'}
              color={'info'}
              loading={loading}
              onClick={handleSubmit}
            >
              Сохранить
            </LoadingButton>
            <Button
              variant={'outlined'}
              color={'info'}
              disabled={loading}
              onClick={handleClose}
            >
              Отмена
            </Button>
          </>
        )}
        onClose={handleClose}
      >
        <Box
          sx={{
            display: 'grid',
            alignItems: 'start',
            gap: '12px',
          }}
        >
          <FieldInput
            value={text}
            name={'title'}
            label={'Текст'}
            placeholder={'Введите текст (максимум 500 символов)'}
            error={touched && (!text || text.length > 500)}
            minRows={10}
            multiline
            onChange={(event) => setText(event.target.value)}
          />
        </Box>
      </DrawerContent>
    </Drawer>
  )
}
