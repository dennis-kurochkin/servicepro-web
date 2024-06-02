import { TableCellHeadFilter } from '@components/TableCellHeadFilter'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { TicketRow } from '@features/tickets/components/TicketRow'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { SerWorkTaskVerbose } from '~/api/servicepro.generated'

interface TicketsTableProps {
  page: number
  count: number
  isSuccess: boolean
  data: SerWorkTaskVerbose[]
  onPageChange: (page: number) => void
  onSelectTask?: (id: number) => void
}

export const TicketsTable = ({ page, count, isSuccess, data, onPageChange, onSelectTask }: TicketsTableProps) => {
  return (
    <TableWrapper
      pagination={{
        page,
        count,
        onPageChange,
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
                  key={task.id}
                  task={task}
                  onSelect={() => onSelectTask ? onSelectTask(task.id) : () => {}}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableWrapper>
  )
}
