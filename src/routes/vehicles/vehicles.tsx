import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { QueryKey } from '@features/shared/data'
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
import { useQuery } from '@tanstack/react-query'

export const VehiclesRoute = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const { data, isSuccess } = useQuery({
    queryKey: [QueryKey.Vehicles, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersVehiclesList({
        orgId: organizationID.toString(),
      })

      return data
    },
  })

  return (
    <>
      <TableHeader
        sx={{ marginTop: '8px' }}
      >
        Техника
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
