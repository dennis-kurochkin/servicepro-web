import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { EngineerRow } from '@features/engineers/components/EngineerRow'
import { QueryKey } from '@features/shared/data'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TableSortLabel,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

export const EngineersRoute = () => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()

  const { data } = useQuery({
    queryKey: [QueryKey.Engineers, organizationID],
    queryFn: async ()=> {
      const { data } = await api.workSersEmployeesList({
        orgId: organizationID.toString(),
        role: 'engineer',
      })
      return data ?? []
    },
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <TableHeader
        sx={{ marginTop: '8px' }}
      >
        Инженеры
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
              <TableCell
                size={'small'}
              >
                Инженеры СО
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
              >
                Заявки
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
              >
                Статус
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
                sx={{ width: TABLE_CONTEXT_BUTTON_CELL_WIDTH, paddingRight: TABLE_CELL_DENSE_PADDING }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((engineer, index) => (
              <EngineerRow
                key={index}
                data={engineer}
              />
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  )
}
