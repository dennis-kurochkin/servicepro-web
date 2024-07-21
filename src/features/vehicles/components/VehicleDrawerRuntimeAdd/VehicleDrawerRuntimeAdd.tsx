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
import { VehicleAdditionVerdict } from '~/api/servicepro.generated'

interface VehicleDrawerRuntimeAddProps {
  open: boolean
  vehicleID: number
  onClose: () => void
}

export const VehicleDrawerRuntimeAdd = ({ open, vehicleID, onClose }: VehicleDrawerRuntimeAddProps) => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { notify } = useNotify()

  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setTouched(true)

    if (!value) {
      return
    }

    try {
      setLoading(true)

      await rr2(api.vehicleSersVehiclesRuntimeCreate)(organizationID.toString(), vehicleID.toString(), {
        value: +value,
        verdict: VehicleAdditionVerdict.Posted,
      })

      notify({
        message: 'Наработка успешно записана',
        variant: 'success',
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.VehicleRuntime] })

      setLoading(false)
      handleClose()
    } catch (error) {
      notify({
        message: 'Не удалось записать наработку',
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

    setValue('')
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
        title={'Записать наработку'}
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
            value={value}
            name={'title'}
            label={'Наработка'}
            placeholder={'Введите значение'}
            type={'number'}
            error={touched && !value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Box>
      </DrawerContent>
    </Drawer>
  )
}
