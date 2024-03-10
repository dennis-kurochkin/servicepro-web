import { Chip, ChipProps } from '@mui/material'

interface TicketDrawerHeaderChipProps {
  label: ChipProps['label']
}

export const TicketDrawerHeaderChip = ({ label }: TicketDrawerHeaderChipProps) => {
  return (
    <Chip
      label={label}
      size={'small'}
      variant={'filled'}
    />
  )
}
