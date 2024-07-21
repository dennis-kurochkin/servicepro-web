import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { DrawerContent } from '@components/DrawerContent'
import { FieldInput, FieldMessage } from '@components/Field'
import { QueryKey } from '@features/shared/data'
import { rr2 } from '@features/ui/types'
import { useApi } from '@hooks/useApi'
import { useNotify } from '@hooks/useNotify'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { AttachFile, Delete, FilePresent } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Drawer, Typography } from '@mui/material'
import { queryClient } from '~/api'

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result as string)
  reader.onerror = reject
})

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

  const onDrop = useCallback((files: File[]) => {
    setFiles(files)
  }, [])

  const dropzone = useDropzone({
    maxFiles: 1,
    accept: { 'application/pdf': ['.pdf'] },
    onDrop,
  })

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
          <div {...dropzone.getRootProps()}>
            <input {...dropzone.getInputProps()} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '8px',
                alignItems: 'center',
                height: files.length ? '180px' : '300px',
                border: (theme) => `1px dashed ${theme.palette.grey['300']}`,
                background: (theme) => theme.palette.grey['50'],
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  background: (theme) => theme.palette.grey['100'],
                },
              }}
            >
              <AttachFile
                sx={{
                  color: (theme) => theme.palette.info.main,
                  fontSize: '48px',
                  transform: 'rotate(45deg)',
                }}
              />
              <Typography
                variant={'body2'}
                sx={{
                  color: (theme) => theme.palette.grey['800'],
                }}
              >
                {dropzone.isDragActive ? 'Перетащите PDF-файл сюда' : 'Перетащите PDF-файл сюда, или нажмите для выбора файлов'}
              </Typography>
            </Box>
            <FieldMessage
              message={'Файл не выбран'}
              show={touched && !files.length}
            />
          </div>
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
