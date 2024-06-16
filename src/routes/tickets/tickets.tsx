import { useCallback, useRef, useState } from 'react'
import { Map, MapRef } from '@components/Map'
import { TableHeader } from '@components/TableHeader'
import { MAP_FLY_DURATION, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { getGeoInfoBounds } from '@features/shared/helpers'
import { TicketsTable } from '@features/tickets/components/TicketsTable'
import { TaskVerbose } from '@features/tickets/types'
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
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null)
  const [selectedTask, setSelectedTask] = useState<TaskVerbose | null>(null)

  const { data, isSuccess } = useQuery({
    queryKey: [QueryKey.TicketsGeos, page, organizationID],
    queryFn: async (): Promise<TaskVerbose[]> => {
      const options = {
        orgId: organizationID.toString(),
        offset: page * PAGINATION_DEFAULT_LIMIT,
        limit: PAGINATION_DEFAULT_LIMIT,
      }

      const { data: tasks, headers } = await api.workSersTasksVerboseList(options)
      const { data: geos } = await api.workSersTasksGeosList(options)

      const result = tasks.length > 0 ? tasks.map((task) => ({
        task,
        geo: geos.find(({ id }) => id == task.id),
      })) : []

      setCount(headers['x-count'] ? +headers['x-count'] : 0)
      handleSelectTask(0, result)

      return result
    },
    refetchOnWindowFocus: false,
  })

  const handleSelectTask = useCallback((index: number | null, tasks?: TaskVerbose[]) => {
    const task = typeof index === 'number' ? (tasks ?? data)?.[index] ?? null : null

    setSelectedTaskIndex(index)
    setSelectedTask(task)

    if (task?.geo) {
      mapRef.current?.flyToBounds(getGeoInfoBounds(task.geo), { duration: MAP_FLY_DURATION })
    }
  }, [data, mapRef])

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
        selectedTask={selectedTask}
        onSelectPrev={(data?.length ?? 0) > 1 && !!selectedTaskIndex ? () => handleSelectTask(selectedTaskIndex - 1) : null}
        onSelectNext={(data?.length ?? 0) > 1 && (selectedTaskIndex === null || selectedTaskIndex < data!.length - 1) ? () => handleSelectTask((selectedTaskIndex ?? -1) + 1) : null}
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
          onSelectTask={(id) => handleSelectTask(data?.findIndex(({ task }) => task.id === id) ?? null)}
        />
      </Container>
    </>
  )
}
