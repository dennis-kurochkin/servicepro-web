'use client'

import React, { ReactElement } from 'react'
import { MapContainer } from 'react-leaflet'
import { Box, SxProps, Typography } from '@mui/material'
import {MapInnerProps} from "~/features/common/components/Map/components/MapInner";
import {MapMarkerProps} from "~/features/common/components/Map/components/MapMarker";
import {LatLng} from "leaflet";
import {MAP_ZOOM_DEFAULT} from "~/features/common/components/Map/constants";
import {omit} from "ramda";
import {theme} from "~/features/common/components/ThemeRegistry/ThemeRegistry";
import {LAT_LNG_INITIAL, MAP_OVERLAY_Z_INDEX} from "~/features/common/constants";
import dynamic from "next/dynamic";

const MapInner = dynamic(() => {
  return import('~/features/common/components/Map/components/MapInner/MapInner')
}, {
  ssr: false
})

export interface MarkerData {
  coords: LatLng
  color: MapMarkerProps['color']
  taskID?: number
  content: ReactElement | string
}

export interface MapProps extends MapInnerProps {
  height?: string
  sx?: SxProps
}

export const Map = (props: MapProps) => {
  const { coords, markers, height = '400px', sx } = props

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
        style={{ height }}
        minZoom={2}
        bounceAtZoomLimits
        scrollWheelZoom
      >
        <MapInner {...omit(['height, sx'], props)} />
      </MapContainer>
    </Box>
  )
}
