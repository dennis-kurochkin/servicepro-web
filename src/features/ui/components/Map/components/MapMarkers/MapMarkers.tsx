import { useMap } from 'react-leaflet'
import { MapProps } from '@features/ui/components/Map'
import { MapMarker } from '@features/ui/components/Map/components/MapMarker'
import { latLngBounds } from 'leaflet'

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
