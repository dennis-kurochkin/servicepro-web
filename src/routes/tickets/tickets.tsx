import { useState } from 'react'
import { useQuery } from 'react-query'
import { Map } from '@components/Map'
import { TableCellHeadFilter } from '@components/TableCellHeadFilter/TableCellHeadFilter'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { TicketDrawer } from '@features/tickets/components/TicketDrwer'
import { TicketRow } from '@features/tickets/components/TicketRow'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export const TicketsRoute = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const [selected, setSelected] = useState<number | null>(null)

  const { data, isSuccess } = useQuery([QueryKey.Tickets, organizationID], async () => {
    const { data: tasks } = await api.workSersTasksVerboseList({
      orgId: organizationID.toString(),
    })

    const { data: geos } = await api.workSersTasksGeosList({
      orgId: organizationID.toString(),
    })

    return tasks.length > 0 ? tasks.map((task) => ({
      task,
      geo: geos.find(({ id }) => id == task.id),
    })) : []
  }, {
    refetchOnWindowFocus: false,
    onSuccess(data) {
      setSelected(data[0].task.id)
    },
  })

  return (
    <>
      <Map
        geo={data?.find((task) => task.task?.id === selected)?.geo}
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
        >
          Заявки
        </TableHeader>
        <TableWrapper
          pagination={{
            page: 0,
            count: data?.length ?? 0,
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
                      selected={selected === task.task?.id}
                      onSelect={() => setSelected(task.task?.id)}
                    />
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </Container>
      <TicketDrawer />
    </>
  )
}
