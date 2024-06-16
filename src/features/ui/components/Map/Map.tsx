import { forwardRef, ReactElement, useImperativeHandle, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import { MapInner, MapInnerProps } from '@components/Map/components/MapInner'
import { MapMarkerProps } from '@components/Map/components/MapMarker'
import { MAP_ZOOM_DEFAULT } from '@components/Map/constants'
import { LAT_LNG_INITIAL, MAP_FLY_DURATION, MAP_OVERLAY_Z_INDEX } from '@constants/index'
import { theme } from '@data/theme'
import { Box, SxProps, Typography } from '@mui/material'
import { FitBoundsOptions, LatLng, LatLngBoundsExpression, Map as LeafletMap } from 'leaflet'
import { WorkTaskGeo } from '~/api/servicepro.generated'

export type MapRef = { flyToBounds: (bounds: LatLngBoundsExpression, options?: FitBoundsOptions) => void }

export interface MarkerData {
  coords: LatLng
  color: MapMarkerProps['color']
  taskID?: number
  content: ReactElement | string
  onSetMap: () => void
}

export interface MapProps extends MapInnerProps {
  geos: WorkTaskGeo[],
  sx?: SxProps
}

export const Map = forwardRef<MapRef, MapProps>((props: MapProps, ref) => {
  const { coords, markers, sx } = props

  const [map, setMap] = useState<LeafletMap | null>(null)

  useImperativeHandle(ref, () => {
    return {
      flyToBounds: (bounds: LatLngBoundsExpression, options?: FitBoundsOptions) => {
        map?.flyToBounds(bounds, {
          duration: MAP_FLY_DURATION,
          ...(options ?? {}),
        })
      },
    }
  }, [map])

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
        ref={setMap}
        center={coords ?? markers?.[0]?.coords ?? LAT_LNG_INITIAL}
        zoom={MAP_ZOOM_DEFAULT}
        style={{ height: '100%' }}
        minZoom={2}
        bounceAtZoomLimits
        scrollWheelZoom
      >
        <MapInner
          coords={props.coords}
          geos={props.geos}
          initiallyOpen={props.initiallyOpen}
          markers={props.markers}
          addressSearch={props.addressSearch}
          onChange={props.onChange}
        />
      </MapContainer>
    </Box>
  )
})
