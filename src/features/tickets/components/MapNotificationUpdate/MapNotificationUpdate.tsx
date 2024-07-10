import { DATE_FORMAT_TIME, MAP_ACTIONS_Z_INDEX } from '@constants/index'
import { Box } from '@mui/material'
import { format } from 'date-fns'

export const MapNotificationUpdate = () => {
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
      Данные обновлены в {format(new Date(), DATE_FORMAT_TIME)}
    </Box>
  )
}
