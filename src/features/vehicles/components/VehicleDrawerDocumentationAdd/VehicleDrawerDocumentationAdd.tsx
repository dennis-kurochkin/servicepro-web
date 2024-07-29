import { useState } from 'react'
import { DrawerContent } from '@components/DrawerContent'
import { Dropzone } from '@components/Dropzone'
import { FieldInput } from '@components/Field'
import { QueryKey } from '@features/shared/data'
import { rr2 } from '@features/ui/types'
import { toBase64 } from '@helpers/index'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Delete, FilePresent } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Drawer, Typography } from '@mui/material'
import { queryClient } from '~/api'

interface VehicleDrawerDocumentationAddProps {
  open: boolean
  vehicleID: number
  onClose: () => void
}

export const VehicleDrawerDocumentationAdd = ({ open, vehicleID, onClose }: VehicleDrawerDocumentationAddProps) => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const { notify } = useNotify()

  const [title, setTitle] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setTouched(true)

    if (!title || !files.length) {
      return
    }

    try {
      setLoading(true)

      const file = await toBase64(files[0])

      await rr2(api.vehicleSersVehiclesDocsCreate)(organizationID.toString(), vehicleID.toString(), {
        title,
        file,
      })

      notify({
        message: 'Документация успешно добавлена',
        variant: 'success',
      })

      await queryClient.invalidateQueries({ queryKey: [QueryKey.VehicleDocuments] })

      setLoading(false)
      handleClose()
    } catch (error) {
      notify({
        message: 'Не удалось добавить документацию',
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

    setTitle('')
    setFiles([])
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
        title={'Добавить документацию'}
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
            value={title}
            name={'title'}
            label={'Наименование'}
            placeholder={'Введите наименование'}
            error={touched && !title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Dropzone
            files={files}
            touched={touched}
            format={'pdf'}
            maxFiles={1}
            onChange={(files) => setFiles(files)}
          />
          {files.map((file, index) => (
            <Box
              key={`${index}${file}${file.lastModified}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 8px',
                gap: '6px',
                background: (theme) => theme.palette.grey['50'],
                border: (theme) => `1px solid ${theme.palette.grey['300']}`,
                borderRadius: 1,
              }}
            >
              <FilePresent
                sx={{
                  color: (theme) => theme.palette.grey['500'],
                  fontSize: '24px',
                }}
              />
              <Typography
                variant={'body1'}
              >
                {file.name}
              </Typography>
              <Delete
                color={'error'}
                sx={{
                  marginLeft: 'auto',
                  cursor: 'pointer',
                }}
                onClick={() => setFiles([])}
              />
            </Box>
          ))}
        </Box>
      </DrawerContent>
    </Drawer>
  )
}
