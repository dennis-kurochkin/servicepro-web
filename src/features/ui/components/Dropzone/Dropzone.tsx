import { ReactNode, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FieldMessage } from '@components/Field'
import { AttachFile } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

interface DropzoneProps {
  files: File[]
  height?: [number, number]
  format: 'pdf' | 'photo'
  touched: boolean
  maxFiles?: number
  content?: (open: () => void) => ReactNode
  onChange: (files: File[]) => void
}

export const Dropzone = ({ files, format, height = [300, 180], maxFiles, touched, onChange, content }: DropzoneProps) => {

  const onDrop = useCallback((files: File[]) => {
    onChange(files)
  }, [onChange])

  const dropzone = useDropzone({
    maxFiles,
    accept: {
      ...(format === 'pdf' ? {
        'application/pdf': ['.pdf'],
      } : {
        'image/jpeg': [],
        'image/png': [],
      }),
    },
    onDrop,
  })

  return (
    <div
      {...dropzone.getRootProps()}
    >
      <input {...dropzone.getInputProps()} />
      <Box sx={{ position: 'relative' }}>
        {content && (
          <Box
            onClick={(event) => event.stopPropagation()}
          >
            {content(dropzone.open)}
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            ...(content ? {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(256, 256, 256, 0.4)',
              pointerEvents: dropzone.isDragActive ? 'all' : 'none',
              opacity: dropzone.isDragActive ? 1 : 0,
            } : {
              flexDirection: 'column',
              height: files.length ? `${height[1]}px` : `${height[0]}px`,
              border: (theme) => `1px dashed ${theme.palette.grey['300']}`,
              background: (theme) => theme.palette.grey['50'],
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                background: (theme) => theme.palette.grey['100'],
              },
            }),
          }}
        >
          <AttachFile
            sx={{
              color: (theme) => theme.palette.info.main,
              ...(content ? {
                fontSize: '32px',
              } : {
                fontSize: '48px',
              }),
              transform: 'rotate(45deg)',
            }}
          />
          <Typography
            variant={'body2'}
            sx={{
              color: (theme) => theme.palette.grey['800'],
            }}
          >
            {dropzone.isDragActive ? `Перетащите ${format === 'pdf' ? 'PDF-файл' : 'фотографии'} сюда` : `Перетащите ${format === 'pdf' ? 'PDF-файл' : 'фотографии'} сюда, или нажмите для выбора файлов`}
          </Typography>
        </Box>
        {!content && (
          <FieldMessage
            message={'Файл не выбран'}
            show={touched && !files.length}
          />
        )}
      </Box>
    </div>
  )
}
