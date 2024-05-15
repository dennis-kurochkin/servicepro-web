import { ButtonContextActions } from '@components/ButtonContextActions'
import { EMPTY_VALUE_DASH, TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { TableCell, TableRow } from '@mui/material'
import { SerVehicle } from '~/api/servicepro.generated'

export interface VehicleRow {
  vehicle: SerVehicle
}

export const VehicleRow = ({ vehicle }: VehicleRow) => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        {vehicle.id}
      </TableCell>
      <TableCell>
        {vehicle.model.brand.name || EMPTY_VALUE_DASH}
      </TableCell>
      <TableCell>
        {vehicle.model.name || EMPTY_VALUE_DASH}
      </TableCell>
      <TableCell>
        <img
          src={vehicle.model.equipment.icon}
          alt={vehicle.model.brand.name || EMPTY_VALUE_DASH}
          style={{ display: 'block' }}
        />
      </TableCell>
      <TableCell>
        {vehicle.sn ? `SN ${vehicle.sn}` : EMPTY_VALUE_DASH}
      </TableCell>
      <TableCell>
        {vehicle.summary?.runtime_sum ? `${vehicle.summary.runtime_sum}мч` : EMPTY_VALUE_DASH}
      </TableCell>
      <TableCell>
        {vehicle.organization?.name}
      </TableCell>
      <TableCell>
        Агротехник 13:00 05.06.2023
      </TableCell>
      <TableCell>
        <EngineerAvatar
          profile={{}}
        />
      </TableCell>
      <TableCell
        sx={{ paddingRight: TABLE_CELL_DENSE_PADDING }}
      >
        <ButtonContextActions
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </TableCell>
    </TableRow>
  )
}
