import { useState } from 'react'
import { Marker, Polyline, useMap, useMapEvent } from 'react-leaflet'
import { Tooltip as LeafletTooltip } from 'react-leaflet/Tooltip'
import ClientMarker from '@assets/client-marker.svg'
import EngineerMarker from '@assets/engineer-marker.svg'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { getGeoInfoExpression } from '@features/shared/helpers'
import { icon } from 'leaflet'
import { WorkTaskGeo } from '~/api/servicepro.generated'

interface MapRouteInfoProps {
  geo: WorkTaskGeo
}

export const MapRouteInfo = ({ geo }: MapRouteInfoProps) => {
  const map = useMap()
  const [zoomSuitableForTooltips, setZoomSuitableForTooltips] = useState(false)

  useMapEvent('zoom', () => {
    setZoomSuitableForTooltips(map.getZoom() >= 7)
  })

  const { executor, route, routeCompleted, executorLocation, taskLocation } = getGeoInfoExpression(geo)

  return (
    <>
      {route && (
        <>
          <Polyline
            pathOptions={{
              lineJoin: 'round',
              color: '#4787F3',
              weight: 6,
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
                  iconSize: [56, 56],
                  iconAnchor: [28, 52],
                })}
                position={executorLocation}
              >
                {zoomSuitableForTooltips && (
                  <LeafletTooltip
                    direction="top"
                    offset={[0, -46]}
                    opacity={1}
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
                  iconSize: [56, 56],
                  iconAnchor: [28, 52],
                })}
                opacity={0}
                position={executorLocation}
              >
                {zoomSuitableForTooltips && (
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
                )}
              </Marker>
            </>
          )}
          {taskLocation && (
            <>
              <Marker
                icon={icon({
                  iconUrl: ClientMarker,
                  iconSize: [56, 56],
                  iconAnchor: [28, 52],
                })}
                position={taskLocation}
              >
                {zoomSuitableForTooltips && (
                  <LeafletTooltip
                    direction="top"
                    offset={[0, -46]}
                    opacity={1}
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
                  iconSize: [56, 56],
                  iconAnchor: [28, 52],
                })}
                opacity={0}
                position={taskLocation}
              >
                {zoomSuitableForTooltips && (
                  <LeafletTooltip
                    direction="bottom"
                    offset={[0, 16]}
                    opacity={1}
                    sticky
                  >
                    Местоположение задачи
                  </LeafletTooltip>
                )}
              </Marker>
            </>
          )}
        </>
      )}
    </>
  )
}
