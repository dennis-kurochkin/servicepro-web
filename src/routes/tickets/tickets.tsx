import { useRef, useState } from 'react'
import { Map, MapRef } from '@components/Map'
import { TableHeader } from '@components/TableHeader'
import { MAP_FLY_DURATION, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { getGeoInfoBounds } from '@features/shared/helpers'
import { TicketsTable } from '@features/tickets/components/TicketsTable'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { WorkTaskGeo } from '~/api/servicepro.generated'

export const TicketsRoute = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()
  const mapRef = useRef<MapRef | null>(null)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)

  const { data, isSuccess } = useQuery({
    queryKey: [QueryKey.TicketsGeos, page, organizationID],
    queryFn: async () => {
      const options = {
        orgId: organizationID.toString(),
        offset: page * PAGINATION_DEFAULT_LIMIT,
        limit: PAGINATION_DEFAULT_LIMIT,
      }

      const { data: tasks, headers } = await api.workSersTasksVerboseList(options)
      const { data: geos } = await api.workSersTasksGeosList(options)

      setCount(headers['x-count'] ? +headers['x-count'] : 0)

      return tasks.length > 0 ? tasks.map((task) => ({
        task,
        geo: geos.find(({ id }) => id == task.id),
      })) : []
    },
    refetchOnWindowFocus: false,
  })

  const handleSelectTask = (geo: WorkTaskGeo | undefined) => {
    if (!geo) {
      return
    }

    mapRef.current?.flyToBounds(getGeoInfoBounds(geo), { duration: MAP_FLY_DURATION })
  }

  return (
    <>
      <Map
        ref={mapRef}
        geos={data?.map(({ geo }) => geo).filter((geo): geo is WorkTaskGeo => !!geo) ?? []}
        sx={{
          height: '45vh',
          minHeight: '328px',
          maxHeight: '500px',
        }}
      />
      <Container
        maxWidth={'xl'}
        sx={{
          paddingTop: '24px',
        }}
      >
        <TableHeader
          sx={{ marginTop: '8px' }}
          amount={count}
        >
          Заявки
        </TableHeader>
        <TicketsTable
          page={page}
          count={count}
          isSuccess={isSuccess}
          data={data?.map(({ task }) => task) ?? []}
          onPageChange={setPage}
          onSelectTask={(id) => handleSelectTask(data?.find(({ task }) => task.id === id)?.geo)}
        />
      </Container>
    </>
  )
}
