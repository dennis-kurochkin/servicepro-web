import { ReactElement, useEffect, useMemo, useRef } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import { ZoomIn } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { icon, LatLng } from 'leaflet'
import styles from './MapMarker.module.css'
import {getNextMarkerZoom} from "~/features/common/components/Map/helpers";

export interface MapMarkerProps {
  coords: LatLng
  initiallyOpen?: boolean
  content?: ReactElement | string
  color?: 'base' | 'blue' | 'orange' | 'dark-blue' | 'grey'
  taskID?: number
  onChangeCoords?: (coords: LatLng) => void
}

export const MapMarker = ({ coords, initiallyOpen = false, content, color = 'base', taskID, onChangeCoords }: MapMarkerProps) => {
  const map = useMap()
  const markerRef = useRef<any>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current

        if (marker != null) {
          onChangeCoords!(marker.getLatLng())
        }
      },
    }),
    [onChangeCoords]
  )

  useEffect(() => {
    if (initiallyOpen) markerRef.current.openPopup()
  }, [initiallyOpen, markerRef])

  return (
    <Marker
      ref={markerRef}
      eventHandlers={eventHandlers}
      icon={icon({
        iconUrl: `/marker-${color}.png`,
        iconRetinaUrl: `/marker-${color}.png`,
        iconSize: [44, 44],
        iconAnchor: [24, 48],
        popupAnchor: [-2, -44],
      })}
      position={coords}
      draggable={!!onChangeCoords}
    >
      <Popup
        minWidth={90}
        closeOnClick={!initiallyOpen}
        className={styles.popup}
      >
        <Box>
          {content ?? `${coords.lat}, ${coords.lng}`}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            marginTop: '16px',
          }}
        >
          <Button
            type={'button'}
            variant={'outlined'}
            sx={{
              paddingX: '8px',
              minWidth: '44px',
            }}
            onClick={() => map.flyTo(coords, getNextMarkerZoom(map.getZoom()))}
          >
            <ZoomIn />
          </Button>
          {typeof taskID !== 'undefined' && (
            <Button
              type={'button'}
              variant={'contained'}
              onClick={() => {}}
            >
              Посмотреть задачу
            </Button>
          )}
        </Box>
      </Popup>
    </Marker>
  )
}
