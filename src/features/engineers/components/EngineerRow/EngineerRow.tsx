import { ButtonContextActions } from '@components/ButtonContextActions'
import { ButtonIcon } from '@components/ButtonIcon'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { TableCellActions } from '@components/TableCellActions'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { Add, GpsFixedOutlined } from '@mui/icons-material'
import { IconButton, TableCell, TableRow, TableSortLabel } from '@mui/material'
import { WorkEmployee } from '~/api/servicepro.generated'

export interface EngineerRow {
  data: WorkEmployee
}

export const EngineerRow = ({ data }: EngineerRow) => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        {data.id}
      </TableCell>
      <TableCell>
        <EngineerAvatar
          profile={data.profile}
        />
      </TableCell>
      <TableCell>
        Агротехник 13:00 05.06.2023
        <TableSortLabel
          direction={'desc'}
          sx={{ marginLeft: '4px' }}
          active
        />
        <IconButton
          size={'small'}
          color={'info'}
          sx={{ marginLeft: '4px' }}
        >
          <Add fontSize={'small'} />
        </IconButton>
      </TableCell>
      <TableCell>
        <ChipStatus />
      </TableCell>
      <TableCellActions>
        <ButtonIcon
          Icon={GpsFixedOutlined}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
        <ButtonContextActions
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </TableCellActions>
    </TableRow>
  )
}
