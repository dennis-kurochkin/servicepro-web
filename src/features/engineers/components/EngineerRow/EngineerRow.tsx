import { useState } from 'react'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { DialogTicketAssign } from '@features/shared/components/DialogTicketAssign'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { TableCell, TableRow } from '@mui/material'
import { WorkEmployee } from '~/api/servicepro.generated'

export interface EngineerRow {
  data: WorkEmployee
}

export const EngineerRow = ({ data }: EngineerRow) => {
  const [open, setOpen] = useState(false)
  const [selectedTaskID, setSelectedTaskID] = useState<number | null>(data.tasks?.[0]?.id ?? null)

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
          selectedTaskID={selectedTaskID ?? null}
          tasks={data.tasks}
          onClickAssign={() => setOpen(true)}
          onChangeSelectedTaskID={setSelectedTaskID}
        />
      </TableCell>
      <TableCell>
        <ChipStatus />
      </TableCell>
      {/*<TableCellActions>*/}
      {/*  <ButtonIcon*/}
      {/*    Icon={GpsFixedOutlined}*/}
      {/*    onClick={(e) => {*/}
      {/*      e.stopPropagation()*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <ButtonContextActions*/}
      {/*    onClick={(e) => {*/}
      {/*      e.stopPropagation()*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</TableCellActions>*/}
      <DialogTicketAssign
        open={open}
        engineer={data}
        onClose={() => setOpen(false)}
        onSelectTaskID={setSelectedTaskID}
      />
    </TableRow>
  )
}
