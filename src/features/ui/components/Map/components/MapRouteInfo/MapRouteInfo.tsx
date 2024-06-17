import { useMemo } from 'react'
import { Marker, Polyline } from 'react-leaflet'
import { Tooltip as LeafletTooltip } from 'react-leaflet/Tooltip'
import ClientMarker from '@assets/client-marker.svg'
import EngineerMarker from '@assets/engineer-marker.svg'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { getGeoInfoExpression } from '@features/shared/helpers'
import { Box } from '@mui/material'
import { icon, IconOptions } from 'leaflet'
import { WorkTaskGeo } from '~/api/servicepro.generated'

const OPACITY_TRANSLUCENT = 0.5

interface MapRouteInfoProps {
  geo: WorkTaskGeo
  selected: boolean
}

export const MapRouteInfo = ({ geo, selected }: MapRouteInfoProps) => {
  const { executor, route, routeCompleted, executorLocation, taskLocation } = getGeoInfoExpression(geo)
  const opacity = useMemo(() => selected ? 1 : OPACITY_TRANSLUCENT, [selected])
  const zIndexOffset = useMemo(() => selected ? 1000 : -1000, [selected])
  const iconSizes = useMemo((): Omit<IconOptions, 'iconUrl'> => selected ? {
    iconSize: [56, 56],
    iconAnchor: [28, 52],
  } : {
    iconSize: [40, 40],
    iconAnchor: [20, 36],
  }, [selected])

  return (
    <Box>
      {route && (
        <>
          <Polyline
            pathOptions={{
              lineJoin: 'round',
              color: '#4787F3',
              weight: 6,
              opacity,
            }}
            positions={route}
          >
            <LeafletTooltip
              direction="bottom"
              offset={[0, 10]}
              opacity={1}
              sticky
            >
              Маршрут
            </LeafletTooltip>
          </Polyline>
          <Polyline
            pathOptions={{
              lineJoin: 'round',
              color: 'green',
              weight: 6,
              opacity,
            }}
            positions={routeCompleted}
          >
            <LeafletTooltip
              direction="bottom"
              offset={[0, 10]}
              opacity={1}
              sticky
            >
              Пройденный путь
            </LeafletTooltip>
          </Polyline>
          {executorLocation && (
            <>
              <Marker
                icon={icon({
                  iconUrl: EngineerMarker,
                  ...iconSizes,
                })}
                zIndexOffset={zIndexOffset}
                opacity={opacity}
                position={executorLocation}
              >
                {selected && (
                  <LeafletTooltip
                    direction="top"
                    offset={[0, -46]}
                    className={'arrowlessTooltip'}
                    permanent
                  >
                    Инженер
                  </LeafletTooltip>
                )}
              </Marker>
              <Marker
                icon={icon({
                  iconUrl: EngineerMarker,
                  ...iconSizes,
                })}
                zIndexOffset={zIndexOffset}
                opacity={0}
                position={executorLocation}
              >
                <LeafletTooltip
                  direction="bottom"
                  offset={[0, 10]}
                  opacity={1}
                  sticky
                >
                  {executor?.profile && (
                    <EngineerAvatar profile={{}} />
                  )}
                </LeafletTooltip>
              </Marker>
            </>
          )}
          {taskLocation && (
            <>
              <Marker
                icon={icon({
                  iconUrl: ClientMarker,
                  ...iconSizes,
                })}
                zIndexOffset={zIndexOffset}
                opacity={opacity}
                position={taskLocation}
              >
                {selected && (
                  <LeafletTooltip
                    direction="top"
                    offset={[0, -46]}
                    className={'arrowlessTooltip'}
                    permanent
                  >
                    Клиент
                  </LeafletTooltip>
                )}
              </Marker>
              <Marker
                icon={icon({
                  iconUrl: ClientMarker,
                  ...iconSizes,
                })}
                zIndexOffset={zIndexOffset}
                opacity={0}
                position={taskLocation}
              >
                <LeafletTooltip
                  direction="bottom"
                  offset={[0, 16]}
                  opacity={1}
                  sticky
                >
                  Местоположение задачи
                </LeafletTooltip>
              </Marker>
            </>
          )}
        </>
      )}
    </Box>
  )
}
