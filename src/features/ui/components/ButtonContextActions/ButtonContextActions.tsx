import { ButtonIcon } from '@components/ButtonIcon'
import { MoreVert } from '@mui/icons-material'
import { IconButtonProps } from '@mui/material'

interface ButtonContextActionsProps extends Pick<IconButtonProps, 'onClick'> {}

export const ButtonContextActions = ({ onClick }: ButtonContextActionsProps) => {
  return (
    <ButtonIcon
      Icon={MoreVert}
      onClick={onClick}
    />
  )
}
