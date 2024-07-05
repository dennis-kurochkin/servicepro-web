import { TableCellHeadFilter } from '@components/TableCellHeadFilter'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { TicketRow } from '@features/tickets/components/TicketRow'
import { SxProps, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { SerWorkTaskVerbose } from '~/api/servicepro.generated'

interface TicketsTableProps {
  page: number
  count: number
  isSuccess: boolean
  data: SerWorkTaskVerbose[]
  sx?: SxProps,
  onPageChange: (page: number) => void
  onSelectTask?: (id: number) => void
}

export const TicketsTable = ({ page, count, isSuccess, data, sx, onPageChange, onSelectTask }: TicketsTableProps) => {
  return (
    <TableWrapper
      pagination={{
        page,
        count,
        onPageChange,
      }}
      sx={sx}
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
              {data.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  onSelect={() => onSelectTask ? onSelectTask(ticket.id) : () => {}}
                />
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableWrapper>
  )
}
