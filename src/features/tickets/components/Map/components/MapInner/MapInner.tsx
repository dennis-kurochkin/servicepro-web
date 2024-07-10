import { useMemo } from 'react'
import { useGeolocated } from 'react-geolocated'
import { useMap, useMapEvent } from 'react-leaflet'
import { MapAddressSearch } from '@features/tickets/components/Map/components/MapAddressSearch'
import { MapRouteInfo } from '@features/tickets/components/Map/components/MapRouteInfo'
import { MapControlLocation } from '@features/tickets/components/MapControlLocation'
import { MapControlTickets } from '@features/tickets/components/MapControlTickets'
import { MapControlUpdateTime } from '@features/tickets/components/MapControlUpdateTime'
import { MapLayersControls } from '@features/tickets/components/MapLayersControls'
import { MapNotificationUpdate } from '@features/tickets/components/MapNotificationUpdate'
import { TaskVerbose } from '@features/tickets/types'
import { MAP_FLY_DURATION } from '@features/ui/constants'
import { useNotify } from '@hooks/useNotify'
import { LatLng, LeafletMouseEvent } from 'leaflet'
import { WorkTaskGeo } from '~/api/servicepro.generated'

export interface MapInnerProps {
  geos: WorkTaskGeo[],
  addressSearch?: boolean
  selectedTask: TaskVerbose | null
  onChange?: (coords: LatLng) => void
  onSelectPrev: (() => void) | null
  onSelectNext: (() => void) | null
}

export const MapInner = ({ geos, addressSearch = false, selectedTask, onChange, onSelectPrev, onSelectNext }: MapInnerProps) => {
  const { notify } = useNotify()
  const map = useMap()

  const geosSorted = useMemo(() => geos.some(({ id }) => id === selectedTask?.geo?.id) ? [
    ...geos.filter((({ id }) => id !== selectedTask?.geo?.id)),
    geos.find(({ id }) => id === selectedTask?.geo?.id) as WorkTaskGeo,
  ] : geos, [geos, selectedTask])

  useMapEvent('click', (e: LeafletMouseEvent) => {
    if (onChange && (e.originalEvent.target as HTMLDivElement).classList.contains('leaflet-container')) {
      onChange(e.latlng)
    }
  })

  const { coords: geolocation, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 100,
  })

  const handleLocateMe = () => {
    if (isGeolocationAvailable && isGeolocationEnabled && geolocation?.latitude) {
      map.flyTo(new LatLng(geolocation.latitude, geolocation.longitude), 15, { duration: MAP_FLY_DURATION })
      map.flyToBounds([])
    } else {
      notify({
        message: 'Невозможно определить местоположение. Проверьте, предоставлен ли доступ',
        variant: 'error',
      })
    }
  }

  const handleAddressSelect = (address: { lat: string; lon: string } | null) => {
    if (address) {
      map.flyTo(new LatLng(+address.lat, +address.lon), 13)
    }
  }

  map.attributionControl.setPrefix('')

  return (
    <>
      <MapLayersControls />
      <MapControlLocation
        onClick={handleLocateMe}
      />
      <MapControlTickets
        selectedTask={selectedTask}
        onSelectPrev={onSelectPrev}
        onSelectNext={onSelectNext}
      />
      <MapControlUpdateTime />
      <MapNotificationUpdate />
      {addressSearch && <MapAddressSearch onSelect={handleAddressSelect} />}
      {geosSorted.map((geo) => (
        <MapRouteInfo
          key={geo.id}
          geo={geo}
          selected={selectedTask?.geo?.id === geo.id}
          selectedTaskClient={selectedTask?.task?.customer ?? null}
        />
      ))}
    </>
  )
}
