import { ButtonContextActions } from '@components/ButtonContextActions'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { AgricultureOutlined } from '@mui/icons-material'
import { TableCell, TableRow } from '@mui/material'

export interface VehicleRow {
  id: number
}

export const VehicleRow = ({ id }: VehicleRow) => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        {id}
      </TableCell>
      <TableCell>
        John Deere
      </TableCell>
      <TableCell>
        9630
      </TableCell>
      <TableCell>
        <AgricultureOutlined />
      </TableCell>
      <TableCell>
        DFHWE6722GNNSSD2009
      </TableCell>
      <TableCell>
        500мч
      </TableCell>
      <TableCell>
        Агротехник
      </TableCell>
      <TableCell>
        Агротехник 13:00 05.06.2023
      </TableCell>
      <TableCell>
        <EngineerAvatar />
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
