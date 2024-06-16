import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonIcon } from '@components/ButtonIcon'
import { TableCellActions } from '@components/TableCellActions'
import { TooltipNew } from '@components/TooltipNew'
import { DATE_FORMAT_TIME_AHEAD, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { getEngineerLabel } from '@features/engineers/helpers'
import { DialogEngineerAssign } from '@features/shared/components/DialogEngineerAssign'
import { TicketChipStatus } from '@features/shared/components/TicketChipStatus/TicketChipStatus'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { GpsFixedOutlined, ManageAccounts } from '@mui/icons-material'
import { TableCell, TableRow } from '@mui/material'
import { format } from 'date-fns'
import { SerWorkTaskVerbose } from '~/api/servicepro.generated'

export interface TicketRowProps {
  task: SerWorkTaskVerbose
  onSelect: () => void
}

/**
 *
 * описание от клиента в чате, координатор может его редактировать, после редакции нужна отметка,
 * что описание было отредактировано координатором
 */

export const TicketRow = ({ task, onSelect }: TicketRowProps) => {
  const navigate = useNavigate()
  const { organizationID } = useOrganizationID()

  const [open, setOpen] = useState(false)
  const requisites = useMemo(() => task.organization?.requisites ?? null, [task.organization?.requisites])
  const vehicle = useMemo(() => task.vehicle ?? null, [task.vehicle])

  const handleClick = () => {
    navigate(`/${organizationID}/tickets/${task.id}`)
  }

  return (
    <>
      <TableRow
        sx={{
          cursor: 'pointer',
          '&:last-child td, &:last-child th': {
            border: 0,
          },
          '& td': {
            verticalAlign: 'top',
          },
        }}
        hover
        onClick={() => handleClick()}
      >
        <TableCell>
          {task.id}
        </TableCell>
        <TableCell>
          {task.customer?.profile ? getEngineerLabel(task.customer?.profile) : EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {requisites?.legal_address?.region?.local_name ?? requisites?.physical_address?.region?.local_name ?? requisites?.postal_address?.region?.local_name ?? EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {requisites?.legal_address?.value ?? requisites?.physical_address?.value ?? requisites?.postal_address?.value ?? EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {vehicle?.model.brand.name || EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {vehicle?.model.name || EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {task.approval.want_start_date ? format(new Date(task.approval.want_start_date), DATE_FORMAT_TIME_AHEAD) : EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {task.approval.plan_start_date ? format(new Date(task.approval.plan_start_date), DATE_FORMAT_TIME_AHEAD) : EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          <TicketChipStatus status={task.status} />
        </TableCell>
        <TableCell>
          <EngineerAvatar
            profile={task.executor?.profile ?? null}
          />
        </TableCell>
        <TableCellActions>
          <TooltipNew
            content={'Показать на карте'}
            strategy={'fixed'}
            placement={'left'}
            target={(
              <ButtonIcon
                Icon={GpsFixedOutlined}
                fontSize={'18px'}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect()
                }}
              />
            )}
          />
          <TooltipNew
            content={'Назначить инженера'}
            strategy={'fixed'}
            placement={'left'}
            target={(
              <ButtonIcon
                Icon={ManageAccounts}
                fontSize={'18px'}
                onClick={(event) => {
                  event.stopPropagation()
                  setOpen(true)
                }}
              />
            )}
          />
        </TableCellActions>
      </TableRow>
      <DialogEngineerAssign
        open={open}
        selectedTaskID={task.id}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
