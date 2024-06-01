import { useMemo, useState } from 'react'
import { EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { DialogEngineerAssign } from '@features/shared/components/DialogEngineerAssign'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { TableCell, TableRow } from '@mui/material'
import { WorkVehicle } from '~/api/servicepro.generated'

export interface VehicleRow {
  vehicle: WorkVehicle
}

export const VehicleRow = ({ vehicle }: VehicleRow) => {
  const [selectedTaskID, setSelectedTaskID] = useState<number | null>(vehicle.tasks?.[0]?.id ?? null)
  const selectedTask = useMemo(() => vehicle.tasks?.find(({ id }) => id === selectedTaskID) ?? null, [selectedTaskID, vehicle.tasks])
  const [open, setOpen] = useState(false)

  return (
    <>
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
          <TableCellTickets
            selectedTaskID={selectedTaskID}
            tasks={vehicle.tasks ?? []}
            onClickAssign={!vehicle.tasks?.length ? undefined : () => setOpen(true)}
            onChangeSelectedTaskID={setSelectedTaskID}
          />
        </TableCell>
        <TableCell>
          <EngineerAvatar
            profile={selectedTask?.executor?.profile ?? null}
          />
        </TableCell>
      </TableRow>
      {selectedTaskID && (
        <DialogEngineerAssign
          open={open}
          selectedTaskID={selectedTaskID}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
