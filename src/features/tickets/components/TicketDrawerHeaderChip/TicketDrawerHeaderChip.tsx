import { Edit, EditOff } from '@mui/icons-material'
import { Chip, ChipProps, SxProps } from '@mui/material'

interface TicketDrawerHeaderChipProps {
  label: ChipProps['label']
  color?: ChipProps['color']
  sx?: SxProps
  disabled?: boolean
  onChange?: () => void
}

export const TicketDrawerHeaderChip = ({ label, color, disabled, sx, onChange }: TicketDrawerHeaderChipProps) => {
  return (
    <Chip
      label={label}
      size={'small'}
      variant={'filled'}
      color={color}
      sx={sx}
      deleteIcon={onChange ? (disabled ? <EditOff /> : <Edit />) : undefined}
      onDelete={onChange ? (disabled ? () => undefined : onChange) : undefined}
      onClick={onChange && !disabled ? onChange : undefined}
    />
  )
}
