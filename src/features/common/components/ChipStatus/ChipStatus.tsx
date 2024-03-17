import { Chip, ChipProps } from '@mui/material'

const getStatusColor = (status: string): ChipProps['color'] => {
  if (status === 'started') {
    return 'success'
  }

  if (status === 'pending') {
    return 'error'
  }

  if (status === 'processing') {
    return 'error'
  }

  if (status === 'pause') {
    return 'info'
  }

  return 'success'
}

const getStatusTitle = (status: string): string => {
  if (status === 'started') {
    return 'ИСО приступил'
  }

  if (status === 'pending') {
    return 'Ожидание ИСО'
  }

  if (status === 'processing') {
    return 'В обработке'
  }

  if (status === 'pause') {
    return 'Пауза'
  }

  return 'Выполнена'
}

export interface ChipStatusProps {
  status?: 'started' | 'pending' | 'success' | 'processing' | 'pause'
  filled?: boolean
}

export const ChipStatus = ({ status, filled = false }: ChipStatusProps) => {
  const statusRandom = Math.random() > 0.5 ? 'started' : Math.random() > 0.5 ? 'pending' : 'finished'
  const statusColor = getStatusColor(status ?? statusRandom)
  const statusTitle = getStatusTitle(status ?? statusRandom)

  return (
    <Chip
      variant={filled ? 'filled' : 'outlined'}
      color={statusColor}
      label={statusTitle}
      size={'small'}
    />
  )
}
