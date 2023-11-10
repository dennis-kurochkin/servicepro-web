'use client'

import React from 'react'
import {useGeolocated} from 'react-geolocated'
import {LayersControl, TileLayer, useMapEvent} from 'react-leaflet'
import {MyLocation} from '@mui/icons-material'
import {Button, Typography} from '@mui/material'
import {LatLng, LeafletMouseEvent} from 'leaflet'
import {MarkerData} from "~/features/common/components/Map";
import {MapMarker, MapMarkerProps} from "~/features/common/components/Map/components/MapMarker";
import {useToast} from "~/features/common/hooks/useToast";
import {MapLayer} from "~/features/common/components/Map/data";
import {MapMarkers} from "~/features/common/components/Map/components/MapMarkers";
import {MapAddressSearch} from "~/features/common/components/Map/components/MapAddressSearch";
import {Tooltip} from "~/features/common/components/Tooltip";
import {MAP_ACTIONS_Z_INDEX} from "~/features/common/constants";

export interface MapInnerProps extends Pick<MapMarkerProps, 'initiallyOpen'> {
  coords?: LatLng
  markers?: MarkerData[]
  addressSearch?: boolean
  onChange?: (coords: LatLng) => void
}

export const MapInner = ({ coords, markers, addressSearch = false, initiallyOpen, onChange }: MapInnerProps) => {
  const { enqueueSnackbar } = useToast()
  const map = useMapEvent('click', (e: LeafletMouseEvent) => {
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
      map.flyTo(new LatLng(geolocation.latitude, geolocation.longitude), 15)
    } else {
      enqueueSnackbar('Невозможно определить местоположение. Проверьте, предоставлен ли доступ', {
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
      {typeof coords !== 'undefined' && (
        <MapMarker
          coords={coords}
          initiallyOpen={initiallyOpen}
          onChangeCoords={onChange}
        />
      )}
      <MapMarkers markers={markers} />
      {!coords && (
        <Tooltip
          placement={'bottom-start'}
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
    </>
  )
}

export default MapInner
