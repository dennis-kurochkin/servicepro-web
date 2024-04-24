import { Chip, ChipProps } from '@mui/material'
import { StatusEnum } from '~/api/servicepro.generated'

const StatusEnumTitle: Record<StatusEnum, string> = {
  [StatusEnum.Done]: 'Выполнено',
  [StatusEnum.Approval]: 'В обработке',
  [StatusEnum.OnWay]: 'В пути',
  [StatusEnum.Wait]: 'Ожидание ИСО',
  [StatusEnum.Pause]: 'Пауза',
  [StatusEnum.Search]: 'Поиск',
  [StatusEnum.Work]: 'ИСО приступил',
}

const StatusEnumColor: Record<StatusEnum, ChipProps['color']> = {
  [StatusEnum.Done]: 'success',
  [StatusEnum.Approval]: 'error',
  [StatusEnum.OnWay]: 'info',
  [StatusEnum.Wait]: 'warning',
  [StatusEnum.Pause]: 'info',
  [StatusEnum.Search]: 'info',
  [StatusEnum.Work]: 'success',
}

export interface ChipStatusProps {
  status?: StatusEnum
  filled?: boolean
  size?: 400 | 500
}

export const ChipStatus = ({ status = StatusEnum.Wait, filled = false, size = 500 }: ChipStatusProps) => {
  return (
    <Chip
      variant={filled ? 'filled' : 'outlined'}
      color={StatusEnumColor[status]}
      label={StatusEnumTitle[status]}
      size={size === 500 ? 'medium' : 'small'}
      sx={{
        paddingTop: '1px',
        borderRadius: '8px',
        fontWeight: 500,
        ...(size === 500 ? {
          height: '30px',
          fontSize: '13px',
        } : {
          height: '24px',
          fontSize: '12px',
        }),
      }}
    />
  )
}