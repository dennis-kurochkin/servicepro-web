import { useQuery } from 'react-query'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { ClientRow } from '@features/clients/components/ClientRow'
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

export const ClientsRoute = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const { data } = useQuery([QueryKey.Clients, organizationID], async () => {
    const { data } = await api.workSersOrgsList({
      orgId: organizationID.toString(),
    })

    return data ?? []
  }, {
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <TableHeader
        sx={{ marginTop: '8px' }}
      >
        Клиенты
      </TableHeader>
      <TableWrapper
        pagination={{
          page: 0,
          count: 5,
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
                Клиент
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
              >
                Регион
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
              >
                Район
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
                align={'center'}
                size={'small'}
              >
                Рекомендации
                <TableSortLabel
                  direction={'desc'}
                  sx={{ marginRight: '-20px' }}
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
            {(data ?? []).map((client, index) => (
              <ClientRow
                key={index}
                data={client}
              />
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  )
}
