import { Map } from '@components/Map'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { TicketRow } from '@features/tickets/components/TicketRow'
import { Container, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'

export const TicketsRoute = () => {
  // const query = useQuery(['tickets'], async () => {
  //   try {
  //     const orgResponse = await api.orgMyRetrieve()
  //     const orgId = orgResponse.data.employments[0].organization.id?.toString() ?? ''
  //
  //     const { data } = await rr(api.workOrgsTaskList)({
  //       orgId,
  //     })
  //
  //     console.log(data)
  //   } catch (error) {
  //     alert(error, 'Не удалось получить профиль')
  //     throw error
  //   }
  // })

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
              <TicketRow
                id={1}
                data={{
                  client: '«Путиловец» ООО',
                  region: 'г. Краснодар',
                  district: 'ул. Тестовская, с. 311',
                  brand: 'John Deere',
                  model: '9630',
                  desiredDate: '13.11.2023 15:30',
                  approvedDate: '15.11.2023 16:00',
                }}
                status={'processing'}
              />
              <TicketRow
                id={2}
                data={{
                  client: 'ООО СПК Колос',
                  region: 'г. Краснодар',
                  district: 'ул. Северная, д. 100',
                  brand: 'John Deere',
                  model: '9630',
                  desiredDate: '15.06.2023 9:00',
                  approvedDate: '15.06.2023 12:00',
                }}
                status={'started'}
              />
              <TicketRow
                id={3}
                data={{
                  client: 'ООО Рога и копыта',
                  region: 'ст. Динская',
                  district: 'ул. Красная, 23',
                  brand: 'John Deere',
                  model: '9630',
                  desiredDate: '15.08.2023 9:00',
                  approvedDate: '15.08.2023 12:00',
                }}
                status={'success'}
              />
              <TicketRow
                id={3}
                data={{
                  client: 'ЗАО АгроПлюс',
                  region: 'ст. Динская',
                  district: 'ул. Калинина, 154',
                  brand: 'John Deere',
                  model: '9630',
                  desiredDate: '15.08.2023 9:00',
                  approvedDate: '15.08.2023 12:00',
                }}
                status={'pause'}
              />
              <TicketRow
                id={5}
                data={{
                  client: '«Путиловец» ООО',
                  region: 'г. Краснодар',
                  district: 'ул. Тестовская, с. 311',
                  brand: 'Агромаш',
                  model: '3000',
                  desiredDate: '18.11.2023 15:30',
                  approvedDate: '19.11.2023 16:00',
                }}
                status={'pending'}
              />
            </TableBody>
          </Table>
        </TableWrapper>
      </Container>
    </>
  )
}
