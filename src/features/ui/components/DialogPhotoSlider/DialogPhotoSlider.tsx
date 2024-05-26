import { ButtonIcon } from '@components/ButtonIcon'
import { useDialogPhotoSliderUtils } from '@components/DialogPhotoSlider/hooks/useDialogPhotoSliderUtils'
import { ArrowBackIosNew, ArrowForwardIos, Close } from '@mui/icons-material'
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material'

export interface DialogPhotoSliderProps {
  open: boolean
  images: string[]
  onClose: () => void
}

export const DialogPhotoSlider = ({ open, images, onClose }: DialogPhotoSliderProps) => {
  const { setCurrentPictureIndex, resetCurrentPictureIndex, currentPictureIndex } = useDialogPhotoSliderUtils()

  const handleClose = () => {
    resetCurrentPictureIndex()
    onClose()
  }

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          display: 'grid',
          gridTemplateRows: 'max-content 1fr',
          width: 'calc(100vw - 64px)',
          maxWidth: 'calc(100vw - 64px)',
          height: 'calc(100vh - 64px)',
          maxHeight: 'calc(100vh - 64px)',
        },
      }}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{ paddingY: '12px' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          Просмотр
          <IconButton
            size={'medium'}
            aria-label="close"
            sx={{ marginRight: '-12px' }}
            onClick={onClose}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '1fr max-content',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            background: (theme) => theme.palette.grey['900'],
          }}
        >
          <img
            src={images[currentPictureIndex]}
            alt={''}
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              margin: '0 auto',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 0 20px',
          }}
        >
          <ButtonIcon
            Icon={ArrowBackIosNew}
            disabled={currentPictureIndex === 0}
            onClick={() => setCurrentPictureIndex(currentPictureIndex - 1)}
          />
          <ButtonIcon
            Icon={ArrowForwardIos}
            disabled={currentPictureIndex === images.length - 1}
            onClick={() => setCurrentPictureIndex(currentPictureIndex + 1)}
          />
        </Box>
      </Box>
    </Dialog>
  )
}
