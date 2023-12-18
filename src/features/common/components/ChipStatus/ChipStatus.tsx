import { Chip, ChipProps } from '@mui/material'

const getStatusColor = (status: string): ChipProps['color'] => {
  if (status === 'started') {
    return 'warning'
  }

  if (status === 'pending') {
    return 'error'
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

  return 'Выполнена'
}

export const ChipStatus = () => {
  const status = Math.random() > 0.5 ? 'started' : Math.random() > 0.5 ? 'pending' : 'finished'
  const statusColor = getStatusColor(status)
  const statusTitle = getStatusTitle(status)

  return (
    <Chip
      variant="outlined"
      color={statusColor}
      label={statusTitle}
      size={'small'}
    />
  )
}
