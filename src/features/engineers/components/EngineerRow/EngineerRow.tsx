import { useState } from 'react'
import { ButtonContextActions } from '@components/ButtonContextActions'
import { ButtonIcon } from '@components/ButtonIcon'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { TableCellActions } from '@components/TableCellActions'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { GpsFixedOutlined } from '@mui/icons-material'
import { TableCell, TableRow } from '@mui/material'
import { WorkEmployee } from '~/api/servicepro.generated'

export interface EngineerRow {
  data: WorkEmployee
}

export const EngineerRow = ({ data }: EngineerRow) => {
  const [selectedTaskID, setSelectedTaskID] = useState<number | null>(data.tasks?.[0]?.number ?? null)

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
        <TableCellTickets
          selectedTaskID={selectedTaskID}
          tasks={data.tasks}
          onChangeSelectedTaskID={setSelectedTaskID}
        />
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
