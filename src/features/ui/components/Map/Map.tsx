import { forwardRef, useImperativeHandle, useState } from 'react'
import { MapContainer } from 'react-leaflet'
import { MapInner, MapInnerProps } from '@components/Map/components/MapInner'
import { MAP_ZOOM_DEFAULT } from '@components/Map/constants'
import { LAT_LNG_INITIAL, MAP_FLY_DURATION } from '@constants/index'
import { TaskVerbose } from '@features/tickets/types'
import { Box, SxProps } from '@mui/material'
import { FitBoundsOptions, LatLngBoundsExpression, Map as LeafletMap } from 'leaflet'
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
  const { coords, sx } = props

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
        center={coords ?? LAT_LNG_INITIAL}
        zoom={MAP_ZOOM_DEFAULT}
        style={{ height: '100%' }}
        minZoom={2}
        bounceAtZoomLimits
        scrollWheelZoom
      >
        <MapInner {...props} />
      </MapContainer>
    </Box>
  )
})
