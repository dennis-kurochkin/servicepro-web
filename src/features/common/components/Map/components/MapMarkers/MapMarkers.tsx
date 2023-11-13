import { useMap } from 'react-leaflet'
import { latLngBounds } from 'leaflet'
import { MapProps } from '~/features/common/components/Map'
import { MapMarker } from '~/features/common/components/Map/components/MapMarker'

interface MapMarkersProps extends Pick<MapProps, 'markers'> {}

export const MapMarkers = ({ markers }: MapMarkersProps) => {
  const map = useMap()

  if (markers?.length) {
    map.fitBounds(latLngBounds(markers.map(({ coords }) => coords)).pad(0.05), {
      animate: true,
      maxZoom: 14,
    })
  }

  return (
    <>
      {markers?.map((marker, index) => (
        <MapMarker
          key={`${marker.coords.toString()}-${index}`}
          {...marker}
        />
      ))}
    </>
  )
}
