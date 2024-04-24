import { useQuery } from 'react-query'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { VehicleRow } from '@features/vehicles/components/VehicleRow'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TableSortLabel,
} from '@mui/material'

export const VehiclesRoute = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const { data, isSuccess } = useQuery(['vehicles', organizationID], async () => {
    const { data } = await api.vehicleSersVehiclesList({
      orgId: organizationID.toString(),
    })

    return data
  })

  return (
    <>
      <TableHeader
        sx={{ marginTop: '8px' }}
      >
        Техника
      </TableHeader>
      {/*<FieldAutocompleteMultiple*/}
      {/*  name={'client'}*/}
      {/*  label={'Техника'}*/}
      {/*  value={[]}*/}
      {/*  options={[]}*/}
      {/*  sx={{ width: '250px' }}*/}
      {/*  labelInside*/}
      {/*  onChange={() => {}}*/}
      {/*/>*/}
      {/*<FieldAutocompleteMultiple*/}
      {/*  name={'client'}*/}
      {/*  label={'Тип'}*/}
      {/*  value={[]}*/}
      {/*  options={[]}*/}
      {/*  sx={{ width: '200px' }}*/}
      {/*  labelInside*/}
      {/*  onChange={() => {}}*/}
      {/*/>*/}
      {/*<FieldAutocompleteMultiple*/}
      {/*  name={'client'}*/}
      {/*  label={'Клиент'}*/}
      {/*  value={[]}*/}
      {/*  options={[]}*/}
      {/*  sx={{ width: '200px' }}*/}
      {/*  labelInside*/}
      {/*  onChange={() => {}}*/}
      {/*/>*/}
      {/*<FieldAutocompleteMultiple*/}
      {/*  name={'client'}*/}
      {/*  label={'Исполнитель'}*/}
      {/*  value={[]}*/}
      {/*  options={[]}*/}
      {/*  sx={{ width: '250px' }}*/}
      {/*  labelInside*/}
      {/*  onChange={() => {}}*/}
      {/*/>*/}
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
                Тип
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
              >
                Заводской номер
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
              >
                Наработка
                <TableSortLabel
                  direction={'desc'}
                  active
                />
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
                Заявки
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
            {isSuccess && (
              <>
                {data.map((vehicle) => (
                  <VehicleRow
                    key={vehicle.id}
                    vehicle={vehicle}
                  />
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </>
  )
}
