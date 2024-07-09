import { Tooltip } from '@components/Tooltip'
import { MAP_ACTIONS_Z_INDEX } from '@constants/index'
import { MyLocation } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'

interface MapControlLocationProps {
  onClick: () => void
}

export const MapControlLocation = ({ onClick }: MapControlLocationProps) => {
  return (
    <Tooltip
      strategy={'fixed'}
      placement={'left'}
      content={(
        <Typography
          variant={'body2'}
        >
          Моё местоположение
        </Typography>
      )}
      target={(
        <Button
          variant={'contained'}
          sx={{
            minWidth: '44px',
            height: '44px',
            paddingX: 0,
          }}
          onClick={onClick}
        >
          <MyLocation />
        </Button>
      )}
      targetSx={{
        position: 'absolute',
        zIndex: MAP_ACTIONS_Z_INDEX,
        bottom: '12px',
        right: '12px',
      }}
    />
  )
}
