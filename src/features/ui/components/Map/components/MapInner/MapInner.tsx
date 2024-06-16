import { useGeolocated } from 'react-geolocated'
import { LayersControl, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { ButtonIcon } from '@components/ButtonIcon'
import { MapRouteInfo } from '@components/Map/components/MapRouteInfo'
import { TooltipNew } from '@components/TooltipNew'
import { getEngineerLabel } from '@features/engineers/helpers'
import { TaskVerbose } from '@features/tickets/types'
import { MarkerData } from '@features/ui/components/Map'
import { MapAddressSearch } from '@features/ui/components/Map/components/MapAddressSearch'
import { MapMarker, MapMarkerProps } from '@features/ui/components/Map/components/MapMarker'
import { MapMarkers } from '@features/ui/components/Map/components/MapMarkers'
import { MapLayer } from '@features/ui/components/Map/data'
import { MAP_ACTIONS_Z_INDEX, MAP_FLY_DURATION } from '@features/ui/constants'
import { useNotify } from '@hooks/useNotify'
import { ChevronLeft, ChevronRight, MyLocation } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { LatLng, LeafletMouseEvent } from 'leaflet'
import { WorkTaskGeo } from '~/api/servicepro.generated'

export interface MapInnerProps extends Pick<MapMarkerProps, 'initiallyOpen'> {
  geos: WorkTaskGeo[],
  coords?: LatLng
  markers?: MarkerData[]
  addressSearch?: boolean
  selectedTask: TaskVerbose | null
  onChange?: (coords: LatLng) => void
  onSelectPrev: (() => void) | null
  onSelectNext: (() => void) | null
}

export const MapInner = ({ geos, coords, markers, addressSearch = false, initiallyOpen, selectedTask, onChange, onSelectPrev, onSelectNext }: MapInnerProps) => {
  const { notify } = useNotify()
  const map = useMap()

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
        <TooltipNew
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
              onClick={handleLocateMe}
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
      )}
      <Box
        sx={{
          position: 'absolute',
          zIndex: MAP_ACTIONS_Z_INDEX,
          bottom: '12px',
          left: '12px',
          display: 'flex',
          gap: '4px',
        }}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.common.white,
            borderRadius: 1,
          }}
        >
          <ButtonIcon
            Icon={ChevronLeft}
            disabled={!onSelectPrev}
            disableElevation={false}
            onClick={onSelectPrev ?? (() => undefined)}
          />
        </Box>
        <Box
          sx={{
            background: (theme) => theme.palette.common.white,
            borderRadius: 1,
          }}
        >
          <ButtonIcon
            Icon={ChevronRight}
            disabled={!onSelectNext}
            disableElevation={false}
            onClick={onSelectNext ?? (() => undefined)}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '32px',
            paddingX: '8px',
            background: (theme) => theme.palette.common.white,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          {selectedTask ? (
            <>
              <Typography
                component={'span'}
                variant={'body2'}
              >
                {selectedTask.task.title}
              </Typography>
              <Typography
                component={'span'}
                variant={'body2'}
                fontWeight={500}
                sx={{ marginLeft: '4px' }}
              >
                {getEngineerLabel(selectedTask.task.customer?.profile ?? {})}
              </Typography>
            </>
          ) : (
            <Typography
              variant={'body2'}
              sx={{ color: (theme) => theme.palette.grey['700'] }}
            >
              Задача не выбрана
            </Typography>
          )}
        </Box>
      </Box>
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
