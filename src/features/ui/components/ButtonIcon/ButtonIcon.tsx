import { MoreVert } from '@mui/icons-material'
import { Button, IconButtonProps, SxProps, Theme } from '@mui/material'

interface ButtonContextActionsProps extends Pick<IconButtonProps, 'disabled' | 'onClick'> {
  size?: 500 | 600
  Icon: typeof MoreVert
  sx?: SxProps<Theme>,
  disableElevation?: boolean,
  fontSize?: string
}

export const ButtonIcon = ({ Icon, sx, size = 500, fontSize, disabled, disableElevation = true, onClick }: ButtonContextActionsProps) => {
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
        ...(size === 600 ? {
          width: '40px',
          height: '40px',
        } : {}),
        ...(sx ?? {}),
      }}
      disabled={disabled}
      disableElevation={disableElevation}
      onClick={onClick}
    >
      <Icon sx={{ fontSize: fontSize ?? '22px' }} />
    </Button>
  )
}
