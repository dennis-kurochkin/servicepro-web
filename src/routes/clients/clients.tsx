import { Fragment, useMemo, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { FieldInputSearch } from '@components/FieldInputSearch'
import { FiltersChips } from '@components/FiltersChips'
import { InformerNoResults } from '@components/InformerNoResults'
import { TableHeader } from '@components/TableHeader'
import { TableRowSentry } from '@components/TableRowSentry'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { DEBOUNCE_DELAY_DEFAULT, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { ClientRow } from '@features/clients/components/ClientRow'
import { ClientsDrawerFilters } from '@features/clients/components/ClientsDrawerFilters'
import { getClientsPageFiltersDefault } from '@features/clients/helpers'
import { ClientsPageFilters } from '@features/clients/types'
import { QueryKey } from '@features/shared/data'
import { getFiltersFilledAmount } from '@features/shared/helpers'
import { TicketsPageFiltersLabels } from '@features/tickets/data'
import { getVehiclesPageFiltersDefault } from '@features/vehicles/helpers'
import { VehiclesPageFilters } from '@features/vehicles/types'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { usePageTitle } from '@hooks/usePageTitle'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'

export const ClientsRoute = () => {
  usePageTitle('Клиенты')

  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<ClientsPageFilters>(getClientsPageFiltersDefault)
  const filtersDebounced = useDebounce(filters, DEBOUNCE_DELAY_DEFAULT)
  const filtersFilled = useMemo(() => getFiltersFilledAmount(filters), [filters])

  const changeFilters = (filters: Partial<VehiclesPageFilters>) => {
    setFilters((prev) => ({ ...prev, ...filters }))
  }

  const { data, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage, status } = useInfiniteQuery({
    queryKey: [QueryKey.Clients, organizationID, filtersDebounced],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.workSersOrgsList({
        orgId: organizationID.toString(),
        limit: PAGINATION_DEFAULT_LIMIT,
        offset: pageParam * PAGINATION_DEFAULT_LIMIT,
        name: filtersDebounced.search,
        address_region: filtersDebounced.region,
        address_district: filtersDebounced.district,
      })

      return data ?? []
    },
    initialDataUpdatedAt: 0,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => lastPage.length === 0 ? null : allPages.length,
    refetchOnWindowFocus: false,
  })

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching || isFetchingNextPage,
    hasNextPage,
    onLoadMore: fetchNextPage,
  })

  return (
    <div>
      <TableHeader
        sx={{ marginTop: '8px' }}
        renderSearch={(
          <FieldInputSearch
            value={filters.search}
            placeholder={'Поиск по клиенту'}
            onChange={(event) => changeFilters({ search: event.target.value })}
          />
        )}
        filtered={filtersFilled > 1}
        onFilterClick={() => setFiltersOpen(true)}
      >
        Клиенты
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
        ]}
        onClear={() => changeFilters(getVehiclesPageFiltersDefault())}
      />
      {!isFetching && !hasNextPage && data?.pages?.length === 1 && data.pages[0].length === 0 && (
        <InformerNoResults
          title={'Клиенты не найдены'}
          subtitle={'Возможно они еще не были добавлены'}
          filtered={!!filters.search}
          actions={(
            <Button
              variant={'outlined'}
              color={'info'}
              onClick={() => changeFilters(getVehiclesPageFiltersDefault())}
            >
              Очистить всё
            </Button>
          )}
          sx={{
            marginTop: '20px',
          }}
        />
      )}
      {(isFetching || isFetchingNextPage || data?.pages?.[0]?.length !== 0) && (
        <TableWrapper>
          <Table
            size={'small'}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  size={'small'}
                >
                  Клиент
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Регион
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Район
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Заявки
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Рекомендации
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === 'success' && data.pages.map((page, index) => (
                <Fragment key={index}>
                  {page.map((client) => (
                    <ClientRow
                      key={client.id}
                      data={client}
                    />
                  ))}
                </Fragment>
              ))}
              {(isFetching || isFetchingNextPage || hasNextPage) && (
                <TableRowSentry
                  ref={sentryRef}
                  colspan={7}
                />
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      )}
      <ClientsDrawerFilters
        open={filtersOpen}
        filters={filters}
        onChange={changeFilters}
        onClose={() => setFiltersOpen(false)}
      />
    </div>
  )
}
