import { StatusEnumLabel } from '@features/tickets/data'
import { Chip, ChipProps, SxProps } from '@mui/material'
import { StatusEnum } from '~/api/servicepro.generated'

const StatusEnumColor: Record<StatusEnum, ChipProps['color']> = {
  [StatusEnum.Done]: 'success',
  [StatusEnum.Approval]: 'error',
  [StatusEnum.OnWay]: 'info',
  [StatusEnum.Wait]: 'warning',
  [StatusEnum.Pause]: 'info',
  [StatusEnum.Search]: 'info',
  [StatusEnum.Work]: 'success',
  [StatusEnum.Processing]: 'info',
}

export interface ChipStatusProps {
  status?: StatusEnum
  filled?: boolean
  size?: 300 | 400 | 500
  sx?: SxProps
}

export const TicketChipStatus = ({ status = StatusEnum.Wait, filled = false, size = 500, sx }: ChipStatusProps) => {
  return (
    <Chip
      variant={filled ? 'filled' : 'outlined'}
      color={StatusEnumColor[status]}
      label={status ? StatusEnumLabel[status] : 'Не обновлялся'}
      size={size === 500 ? 'medium' : 'small'}
      sx={{
        paddingTop: '1px',
        borderRadius: '8px',
        fontWeight: 500,
        textTransform: 'uppercase',
        ...(size === 500 ? {
          height: '30px',
          fontSize: '13px',
        } : {}),
        ...(size === 400 ? {
          height: '24px',
          fontSize: '12px',
        } : {}),
        ...(size === 300 ? {
          height: '18px',
          fontSize: '10px',
        } : {}),
        ...(sx ?? {}),
      }}
    />
  )
}
