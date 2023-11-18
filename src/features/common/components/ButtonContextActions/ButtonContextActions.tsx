import { MoreVert } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'

interface ButtonContextActionsProps extends Pick<IconButtonProps, 'onClick'> {}

export const ButtonContextActions = ({ onClick }: ButtonContextActionsProps) => {
  return (
    <IconButton
      size={'small'}
      onClick={onClick}
    >
      <MoreVert fontSize={'small'} />
    </IconButton>
  )
}
