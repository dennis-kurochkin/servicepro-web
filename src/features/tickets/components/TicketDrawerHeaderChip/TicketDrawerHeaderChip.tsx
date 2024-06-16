import { Edit } from '@mui/icons-material'
import { Chip, ChipProps, SxProps } from '@mui/material'

interface TicketDrawerHeaderChipProps {
  label: ChipProps['label']
  sx?: SxProps
  onChange?: () => void
}

export const TicketDrawerHeaderChip = ({ label, sx, onChange }: TicketDrawerHeaderChipProps) => {
  return (
    <Chip
      label={label}
      size={'small'}
      variant={'filled'}
      sx={sx}
      deleteIcon={onChange ? <Edit /> : undefined}
      onDelete={onChange ? onChange : undefined}
      onClick={onChange ? onChange : undefined}
    />
  )
}
