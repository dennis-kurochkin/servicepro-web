import { useRef, useState } from 'react'
import { Map, MapRef } from '@components/Map'
import { TableCellHeadFilter } from '@components/TableCellHeadFilter/TableCellHeadFilter'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { PAGINATION_DEFAULT_LIMIT, TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { getGeoInfoBounds } from '@features/shared/helpers'
import { TicketRow } from '@features/tickets/components/TicketRow'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
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

    mapRef.current?.flyToBounds(getGeoInfoBounds(geo))
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
        <TableWrapper
          pagination={{
            page,
            count,
            onPageChange: setPage,
          }}
        >
          <Table
            sx={{ minHeight: 200 }}
            size={'small'}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  size={'small'}
                />
                <TableCellHeadFilter>
                  Клиент
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Регион
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Район
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Бренд
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Модель
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Желаемое&nbsp;время
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Согласованное
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Статус
                </TableCellHeadFilter>
                <TableCellHeadFilter>
                  Инженер
                </TableCellHeadFilter>
                <TableCell
                  size={'small'}
                  sx={{ width: TABLE_CONTEXT_BUTTON_CELL_WIDTH, paddingRight: TABLE_CELL_DENSE_PADDING }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {isSuccess && (
                <>
                  {data.map((task) => (
                    <TicketRow
                      key={task.task.id}
                      task={task.task}
                      onSelect={() => handleSelectTask(task.geo)}
                    />
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </Container>
    </>
  )
}
