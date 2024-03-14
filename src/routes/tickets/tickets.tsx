import { useQuery } from 'react-query'
import { Map } from '@components/Map'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { rr } from '@features/common/types'
import { TicketRow } from '@features/tickets/components/TicketRow'
import { useApi } from '@hooks/useApi'
import { useErrorAlert } from '@hooks/useErrorAlert'
import { Container, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'

export const TicketsRoute = () => {
  const { api } = useApi()
  const { alert } = useErrorAlert()

  const query = useQuery(['tickets'], async () => {
    try {
      const orgResponse = await api.orgMyRetrieve()
      const orgId = orgResponse.data.employments[0].organization.id?.toString() ?? ''

      const { data } = await rr(api.workOrgsTaskList)({
        orgId,
      })

      console.log(data)
    } catch (error) {
      alert(error, 'Не удалось получить профиль')
      throw error
    }
  })

  //
  // const authMutation = useMutation(['test'], async () => {
  //   try {
  //     const { data } = await api.orgMyRetrieve()
  //     console.log(data)
  //   } catch (error) {
  //     alert(error, 'Не удалось получить профиль')
  //   }
  // })
  //
  // const handleClick = async () => {
  //   await authMutation.mutateAsync()
  // }

  return (
    <>
      <Map
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
          amount={32}
          sx={{ marginTop: '8px' }}
        >
          Заявки
        </TableHeader>
        <TableWrapper>
          <Table
            sx={{ minHeight: 200 }}
            size={'small'}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  size={'small'}
                >
                </TableCell>
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
                  Бренд
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Модель
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Желаемое время
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Согласованное
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
                >
                  Инженер
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
              {Array.from({ length: 20 }).map((_, index) => (
                <TicketRow
                  key={index}
                  id={index + 1}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Container>
    </>
  )
}
