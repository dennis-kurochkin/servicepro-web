import { useCallback, useMemo, useRef, useState } from 'react'
import { FieldInputSearch } from '@components/FieldInputSearch'
import { FiltersChips } from '@components/FiltersChips'
import { TableHeader } from '@components/TableHeader'
import { DEBOUNCE_DELAY_DEFAULT, MAP_FLY_DURATION, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { getFiltersFilledAmount, getGeoInfoBounds } from '@features/shared/helpers'
import { Map, MapRef } from '@features/tickets/components/Map'
import { TicketDrawerFilters } from '@features/tickets/components/TicketDrawerFilters'
import { TicketsTable } from '@features/tickets/components/TicketsTable'
import { StatusEnumLabel, TicketsPageFiltersLabels } from '@features/tickets/data'
import { getTicketsPageFiltersDefault } from '@features/tickets/helpers'
import { TaskVerbose, TicketsPageFilters } from '@features/tickets/types'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { usePageTitle } from '@hooks/usePageTitle'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { WorkSersTasksVerboseListParams, WorkTaskGeo } from '~/api/servicepro.generated'
import { useMapStore } from '~/store/useMapStore'

export const TicketsRoute = () => {
  usePageTitle('Заявки')

  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const updateTime = useMapStore((state) => state.updateTime)
  const setUpdatedTime = useMapStore((state) => state.setUpdatedTime)

  const mapRef = useRef<MapRef | null>(null)

  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null)
  const [selectedTask, setSelectedTask] = useState<TaskVerbose | null>(null)

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<TicketsPageFilters>(getTicketsPageFiltersDefault)
  const filtersDebounced = useDebounce(filters, DEBOUNCE_DELAY_DEFAULT)
  const filtersFilled = useMemo(() => getFiltersFilledAmount(filters), [filters])

  const { data, isSuccess } = useQuery({
    queryKey: [QueryKey.TicketsGeos, organizationID, page, filtersDebounced],
    queryFn: async (): Promise<TaskVerbose[]> => {
      const options: WorkSersTasksVerboseListParams = {
        orgId: organizationID.toString(),
        offset: page * PAGINATION_DEFAULT_LIMIT,
        limit: PAGINATION_DEFAULT_LIMIT,
        organization_name: filtersDebounced.search,
        organization_address_region: filtersDebounced.region,
        organization_address_district: filtersDebounced.district,
        vehicle_brand_name: filtersDebounced.brand,
        vehicle_model_name: filtersDebounced.model,
        status: filtersDebounced.status,
      }

      const { data: tasks, headers } = await api.workSersTasksVerboseList(options)
      const { data: geos } = await api.workSersTasksGeosList(options)

      const result = tasks.length > 0 ? tasks.map((task) => ({
        task,
        geo: geos.find(({ id }) => id == task.id),
      })) : []

      setCount(headers['x-count'] ? +headers['x-count'] : 0)
      setUpdatedTime(new Date())

      if (selectedTask && tasks.find((task) => task.id === selectedTask.task.id)) {
        return result
      }

      handleSelectTask(0, result)
      return result
    },
    refetchInterval: +updateTime * 60000,
    refetchOnWindowFocus: false,
  })

  const changeFilters = (filters: Partial<TicketsPageFilters>) => {
    setPage(0)
    setFilters((prev) => ({ ...prev, ...filters }))
  }

  const handleSelectTask = useCallback((index: number | null, tasks?: TaskVerbose[]) => {
    const task = typeof index === 'number' ? (tasks ?? data)?.[index] ?? null : null

    setSelectedTaskIndex(index)
    setSelectedTask(task)

    if (task?.geo) {
      mapRef.current?.flyToBounds(getGeoInfoBounds(task.geo), { duration: MAP_FLY_DURATION })
    }
  }, [data, mapRef])

  return (
    <div>
      <Map
        ref={mapRef}
        geos={data?.map(({ geo }) => geo).filter((geo): geo is WorkTaskGeo => !!geo) ?? []}
        selectedTask={selectedTask}
        sx={{
          height: '45vh',
          minHeight: '328px',
          maxHeight: '500px',
        }}
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
          filtered={filtersFilled > 1}
          renderSearch={(
            <FieldInputSearch
              value={filters.search}
              placeholder={'Поиск по клиенту'}
              onChange={(event) => changeFilters({ search: event.target.value })}
            />
          )}
          onFilterClick={() => setFiltersOpen(true)}
        >
          Заявки
        </TableHeader>
        <FiltersChips
          filled={filtersFilled}
          chips={[
            {
              value: filters.search,
              onDelete: () => changeFilters({ search: '' }),
            },
            {
              value: filters.region,
              label: TicketsPageFiltersLabels['region'],
              onDelete: () => changeFilters({ region: '' }),
            },
            {
              value: filters.district,
              label: TicketsPageFiltersLabels['district'],
              onDelete: () => changeFilters({ district: '' }),
            },
            {
              value: filters.brand,
              label: TicketsPageFiltersLabels['brand'],
              onDelete: () => changeFilters({ brand: '' }),
            },
            {
              value: filters.model,
              label: TicketsPageFiltersLabels['model'],
              onDelete: () => changeFilters({ model: '' }),
            },
            ...filters.status.map((status) => ({
              value: StatusEnumLabel[status],
              label: TicketsPageFiltersLabels['status'],
              onDelete: () => changeFilters({ status: filters.status.filter((s) => s !== status) }),
            })),
          ]}
          onClear={() => changeFilters(getTicketsPageFiltersDefault())}
        />
        <TicketsTable
          page={page}
          count={count}
          isSuccess={isSuccess}
          data={data?.map(({ task }) => task) ?? []}
          onPageChange={setPage}
          onSelectTask={(id) => handleSelectTask(data?.findIndex(({ task }) => task.id === id) ?? null)}
        />
        <TicketDrawerFilters
          open={filtersOpen}
          filters={filters}
          onChange={changeFilters}
          onClose={() => setFiltersOpen(false)}
        />
      </Container>
    </div>
  )
}
