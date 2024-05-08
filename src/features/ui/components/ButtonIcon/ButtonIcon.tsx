import { MoreVert } from '@mui/icons-material'
import { Button, IconButtonProps } from '@mui/material'

interface ButtonContextActionsProps extends Pick<IconButtonProps, 'onClick'> {
  Icon: typeof MoreVert
  fontSize?: string
}

export const ButtonIcon = ({ Icon, fontSize, onClick }: ButtonContextActionsProps) => {
  return (
    <Button
      size={'small'}
      variant="contained"
      color={'info'}
      sx={{
        width: '32px',
        height: '32px',
        padding: '0',
        background: 'rgba(0, 0, 0, 0.06)',
        color: (theme) => theme.palette.info.main,
        minWidth: '0',
        '& .MuiButton-startIcon': {
          marginRight: 0,
        },
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.12)',
        },
      }}
      disableElevation
      onClick={onClick}
    >
      <Icon sx={{ fontSize: fontSize ?? '22px' }} />
    </Button>
  )
}
