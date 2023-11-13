import { ReactElement } from 'react'
import { MapContainer } from 'react-leaflet'
import { MapInner, MapInnerProps } from '@components/Map/components/MapInner'
import { MapMarkerProps } from '@components/Map/components/MapMarker'
import { MAP_ZOOM_DEFAULT } from '@components/Map/constants'
import { LAT_LNG_INITIAL, MAP_OVERLAY_Z_INDEX } from '@constants/index'
import { theme } from '@data/theme'
import { Box, SxProps, Typography } from '@mui/material'
import { LatLng } from 'leaflet'
import { omit } from 'ramda'

export interface MarkerData {
  coords: LatLng
  color: MapMarkerProps['color']
  taskID?: number
  content: ReactElement | string
}

export interface MapProps extends MapInnerProps {
  height?: string
  minHeight?: string
  sx?: SxProps
}

export const Map = (props: MapProps) => {
  const { coords, markers, height = '400px', minHeight, sx } = props

  return (
    <Box
      sx={{
        position: 'relative',
        padding: 0,
        overflow: 'hidden',
        ...(sx ?? {}),
      }}
    >
      {typeof markers !== 'undefined' && markers.length === 0 && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: MAP_OVERLAY_Z_INDEX,
            left: '0',
            top: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            background: 'rgba(0,0,0,.5)',
          }}
        >
          <Typography
            variant={'h5'}
            color={theme.palette.common.white}
          >
            Нет геометок для задач из списка
          </Typography>
        </Box>
      )}
      <MapContainer
        center={coords ?? markers?.[0]?.coords ?? LAT_LNG_INITIAL}
        zoom={MAP_ZOOM_DEFAULT}
        style={{ height, minHeight }}
        minZoom={2}
        bounceAtZoomLimits
        scrollWheelZoom
      >
        <MapInner {...omit(['height, minHeight, sx'], props)} />
      </MapContainer>
    </Box>
  )
}
