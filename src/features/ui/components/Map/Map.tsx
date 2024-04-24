import { ReactElement } from 'react'
import { MapContainer, Marker, Polyline, Tooltip } from 'react-leaflet'
import { MapInner, MapInnerProps } from '@components/Map/components/MapInner'
import { MapMarkerProps } from '@components/Map/components/MapMarker'
import { MAP_ZOOM_DEFAULT } from '@components/Map/constants'
import { LAT_LNG_INITIAL, MAP_OVERLAY_Z_INDEX } from '@constants/index'
import { theme } from '@data/theme'
import { Box, SxProps, Typography } from '@mui/material'
import { LatLng } from 'leaflet'
import { omit } from 'ramda'
import { WorkTaskGeo } from '~/api/servicepro.generated'

export interface MarkerData {
  coords: LatLng
  color: MapMarkerProps['color']
  taskID?: number
  content: ReactElement | string
}

export interface MapProps extends MapInnerProps {
  geo?: WorkTaskGeo,
  sx?: SxProps
}

export const Map = (props: MapProps) => {
  const { coords, markers, sx, geo } = props

  const route = geo?.routes?.[4]

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
        style={{ height: '100%' }}
        minZoom={2}
        bounceAtZoomLimits
        scrollWheelZoom
      >
        {route && (
          <>
            <Polyline
              pathOptions={{
                lineJoin: 'round',
                color: '#4787F3',
                weight: 5,
              }}
              positions={route.points.map((point) => ([
                point.lat,
                point.lon,
              ]))}
            >
              <Tooltip
                direction="bottom"
                offset={[0, 10]}
                opacity={1}
                sticky
              >
                Маршрут
              </Tooltip>
            </Polyline>
            <Polyline
              pathOptions={{
                lineJoin: 'round',
                color: 'green',
                weight: 5,
              }}
              positions={route.geolocation.map((point) => ([
                point.lat,
                point.lon,
              ]))}
            >
              <Tooltip
                direction="bottom"
                offset={[0, 10]}
                opacity={1}
                sticky
              >
                Маршрут
              </Tooltip>
            </Polyline>
            {geo?.executor.geolocation?.[0] && (
              <Marker
                position={{
                  lat: geo.executor.geolocation[0].lat,
                  lng: geo.executor.geolocation[0].lon,
                }}
              />
            )}
            {route.geolocation?.[0] && (
              <Marker
                position={{
                  lat: route.geolocation[0].lat,
                  lng: route.geolocation[0].lon,
                }}
              />
            )}
          </>
        )}
        <MapInner {...omit(['height, minHeight, sx'], props)} />
      </MapContainer>
    </Box>
  )
}
