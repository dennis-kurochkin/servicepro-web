import { useEffect } from 'react'
import { useGeolocated } from 'react-geolocated'
import { LayersControl, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { MapRouteInfo } from '@components/Map/components/MapRouteInfo'
import { getGeoInfoBounds } from '@features/shared/helpers'
import { MarkerData } from '@features/ui/components/Map'
import { MapAddressSearch } from '@features/ui/components/Map/components/MapAddressSearch'
import { MapMarker, MapMarkerProps } from '@features/ui/components/Map/components/MapMarker'
import { MapMarkers } from '@features/ui/components/Map/components/MapMarkers'
import { MapLayer } from '@features/ui/components/Map/data'
import { Tooltip } from '@features/ui/components/Tooltip'
import { MAP_ACTIONS_Z_INDEX, MAP_FLY_DURATION } from '@features/ui/constants'
import { useNotify } from '@hooks/useNotify'
import { MyLocation } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { LatLng, LeafletMouseEvent } from 'leaflet'
import { WorkTaskGeo } from '~/api/servicepro.generated'

export interface MapInnerProps extends Pick<MapMarkerProps, 'initiallyOpen'> {
  geos: WorkTaskGeo[],
  coords?: LatLng
  markers?: MarkerData[]
  addressSearch?: boolean
  onChange?: (coords: LatLng) => void
}

export const MapInner = ({ geos, coords, markers, addressSearch = false, initiallyOpen, onChange }: MapInnerProps) => {
  const { notify } = useNotify()
  const map = useMap()

  useMapEvent('click', (e: LeafletMouseEvent) => {
    if (onChange && (e.originalEvent.target as HTMLDivElement).classList.contains('leaflet-container')) {
      onChange(e.latlng)
    }
  })

  useEffect(() => {
    if (geos.length === 0) {
      return
    }

    map.flyToBounds(getGeoInfoBounds(geos[0]), { duration: MAP_FLY_DURATION })
  }, [geos, map])

  const { coords: geolocation, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 100,
  })

  const handleLocateMe = () => {
    if (isGeolocationAvailable && isGeolocationEnabled && geolocation?.latitude) {
      map.flyTo(new LatLng(geolocation.latitude, geolocation.longitude), 15)
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
      <LayersControl position="topright">
        <LayersControl.BaseLayer
          name={'Схема'}
          checked
        >
          <TileLayer
            url={MapLayer.OpenMaps}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name={'Спутник'}
        >
          <TileLayer
            url={MapLayer.Satellite}
            maxZoom={19}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name={'Гибрид'}
        >
          <TileLayer
            url={MapLayer.Hybrid}
            maxZoom={19}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {!coords && (
        <Tooltip
          placement={'left'}
          content={(
            <Typography
              variant={'body2'}
            >
              Моё местоположение
            </Typography>
          )}
        >
          <Button
            variant={'contained'}
            sx={{
              position: 'absolute',
              zIndex: MAP_ACTIONS_Z_INDEX,
              bottom: '12px',
              right: '12px',
              minWidth: '44px',
              height: '44px',
              paddingX: 0,
            }}
            onClick={handleLocateMe}
          >
            <MyLocation />
          </Button>
        </Tooltip>
      )}
      {addressSearch && <MapAddressSearch onSelect={handleAddressSelect} />}
      {typeof coords !== 'undefined' && (
        <MapMarker
          coords={coords}
          initiallyOpen={initiallyOpen}
          onChangeCoords={onChange}
        />
      )}
      <MapMarkers markers={markers} />
      {geos.map((geo) => (
        <MapRouteInfo
          key={geo.id}
          geo={geo}
        />
      ))}
    </>
  )
}

export default MapInner
