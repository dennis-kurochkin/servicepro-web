import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { VehicleRow } from '@features/vehicles/components/VehicleRow'
import { SxProps, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { WorkVehicle } from '~/api/servicepro.generated'

interface VehiclesTableProps {
  data: WorkVehicle[]
  isSuccess: boolean
  sx?: SxProps
}

export const VehiclesTable = ({ data, isSuccess, sx }: VehiclesTableProps) => {
  return (
    <TableWrapper
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
  )
}
