import { useMemo } from 'react'
import { Marker, Polyline } from 'react-leaflet'
import { Tooltip as LeafletTooltip } from 'react-leaflet/Tooltip'
import ClientMarker from '@assets/client-marker.svg'
import EngineerMarker from '@assets/engineer-marker.svg'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { getEngineerLabel } from '@features/engineers/helpers'
import { getGeoInfoExpression } from '@features/shared/helpers'
import { useQueryEmployee } from '@features/shared/hooks/useQueryEmployee'
import { Box } from '@mui/material'
import { icon, IconOptions } from 'leaflet'
import { EmployeeDetailed, WorkTaskGeo } from '~/api/servicepro.generated'

const OPACITY_TRANSLUCENT = 0.5

interface MapRouteInfoProps {
  geo: WorkTaskGeo
  selected: boolean
  selectedTaskClient: EmployeeDetailed | null
}

export const MapRouteInfo = ({ geo, selected, selectedTaskClient }: MapRouteInfoProps) => {
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

  const executorProfileQuery = useQueryEmployee(executor?.id ?? null)

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
                    offset={[0, -48]}
                    className={'arrowlessTooltip'}
                    permanent
                  >
                    {executorProfileQuery.isSuccess ? (
                      <>
                        <EngineerAvatar
                          variant={'uncontained'}
                          size={400}
                          profile={executorProfileQuery.data}
                        />
                      </>
                    ) : 'Инженер'}
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
                    {selectedTaskClient ? (
                      <>
                        {getEngineerLabel(selectedTaskClient.profile)}
                      </>
                    ) : 'Клиент'}
                  </LeafletTooltip>
                )}
              </Marker>
            </>
          )}
        </>
      )}
    </Box>
  )
}
