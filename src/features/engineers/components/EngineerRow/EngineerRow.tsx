import { useMemo, useState } from 'react'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { DialogTicketAssign } from '@features/shared/components/DialogTicketAssign'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { TicketChipStatus } from '@features/shared/components/TicketChipStatus/TicketChipStatus'
import { TableCell, TableRow } from '@mui/material'
import { WorkEmployee } from '~/api/servicepro.generated'

export interface EngineerRow {
  data: WorkEmployee
}

export const EngineerRow = ({ data }: EngineerRow) => {
  const [open, setOpen] = useState(false)
  const [selectedTaskID, setSelectedTaskID] = useState<number | null>(data.tasks?.[0]?.id ?? null)
  const selectedTask = useMemo(() => data.tasks.find(({ id }) => id === selectedTaskID) ?? null, [selectedTaskID, data.tasks])

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
        <TicketChipStatus
          status={selectedTask?.status}
        />
      </TableCell>
      <DialogTicketAssign
        open={open}
        engineer={data}
        onClose={() => setOpen(false)}
        onSelectTaskID={setSelectedTaskID}
      />
    </TableRow>
  )
}
