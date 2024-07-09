import { forwardRef, useImperativeHandle, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import { LAT_LNG_INITIAL, MAP_FLY_DURATION } from '@constants/index'
import { MapInner, MapInnerProps } from '@features/tickets/components/Map/components/MapInner'
import { MAP_ZOOM_DEFAULT } from '@features/tickets/components/Map/constants'
import { TaskVerbose } from '@features/tickets/types'
import { Box, SxProps } from '@mui/material'
import { FitBoundsOptions, LatLngBoundsExpression, Map as LeafletMap } from 'leaflet'
import { omit } from 'ramda'
import { WorkTaskGeo } from '~/api/servicepro.generated'

export type MapRef = { flyToBounds: (bounds: LatLngBoundsExpression, options?: FitBoundsOptions) => void }

export interface MapProps extends MapInnerProps {
  geos: WorkTaskGeo[],
  sx?: SxProps
  selectedTask: TaskVerbose | null
  onSelectPrev: (() => void) | null
  onSelectNext: (() => void) | null
}

export const Map = forwardRef<MapRef, MapProps>((props: MapProps, ref) => {
  const { sx } = props

  const [map, setMap] = useState<LeafletMap | null>(null)

  useImperativeHandle(ref, () => {
    return {
      flyToBounds: (bounds: LatLngBoundsExpression, options?: FitBoundsOptions) => {
        map?.flyToBounds(bounds, {
          duration: MAP_FLY_DURATION,
          padding: [50, 50],
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
      <MapContainer
        ref={setMap}
        center={LAT_LNG_INITIAL}
        zoom={MAP_ZOOM_DEFAULT}
        style={{ height: '100%' }}
        minZoom={2}
        bounceAtZoomLimits
        scrollWheelZoom
      >
        <MapInner {...omit(['sx'], props)} />
      </MapContainer>
    </Box>
  )
})
