import { DATE_FORMAT_TIME, MAP_ACTIONS_Z_INDEX } from '@constants/index'
import { Box } from '@mui/material'
import { format } from 'date-fns'
import { useMapStore } from '~/store/useMapStore'

export const MapNotificationUpdate = () => {
  const updatedTime = useMapStore((state) => state.updatedTime)

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: MAP_ACTIONS_Z_INDEX,
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '4px 10px',
        borderRadius: '0 0 6px 6px',
        boxShadow: 1,
        background: (theme) => theme.palette.background.paper,
      }}
    >
      Данные обновлены в {format(updatedTime, DATE_FORMAT_TIME)}
    </Box>
  )
}
