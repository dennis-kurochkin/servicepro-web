import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonIcon } from '@components/ButtonIcon'
import { TableCellActions } from '@components/TableCellActions'
import { DATE_FORMAT_DEFAULT, DATE_FORMAT_TIME, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { getEmployeeLabel } from '@features/engineers/helpers'
import { DialogEngineerAssign } from '@features/shared/components/DialogEngineerAssign'
import { TicketChipStatus } from '@features/shared/components/TicketChipStatus/TicketChipStatus'
import { useEmployeeRating } from '@features/shared/hooks/useEmployeeRating'
import { useEmployeesList } from '@features/shared/hooks/useEmployeesList'
import { ticketStatusesEngineerEditable } from '@features/tickets/data'
import { Tooltip } from '@features/ui/components/Tooltip'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { GpsFixedOutlined, ManageAccounts } from '@mui/icons-material'
import { Box, TableCell, TableRow } from '@mui/material'
import { format } from 'date-fns'
import { SerWorkTaskVerbose } from '~/api/servicepro.generated'

export interface TicketRowProps {
  ticket: SerWorkTaskVerbose
  onSelect: () => void
}

/**
 *
 * описание от клиента в чате, координатор может его редактировать, после редакции нужна отметка,
 * что описание было отредактировано координатором
 */

export const TicketRow = ({ ticket, onSelect }: TicketRowProps) => {
  const navigate = useNavigate()
  const { organizationID } = useOrganizationID()
  const { rating } = useEmployeeRating(ticket.executor?.id)
  const { data: employees } = useEmployeesList()

  const [open, setOpen] = useState(false)
  const requisites = useMemo(() => ticket.organization?.requisites ?? null, [ticket.organization?.requisites])
  const vehicle = useMemo(() => ticket.vehicle ?? null, [ticket.vehicle])

  const handleClick = () => {
    navigate(`/${organizationID}/tickets/${ticket.id}`)
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
          {ticket.id}
        </TableCell>
        <TableCell>
          <Box>
            {ticket.organization?.name ?? EMPTY_VALUE_DASH}
          </Box>
          <Box
            sx={{
              color: (theme) => theme.palette.grey['600'],
            }}
          >
            {ticket.customer?.profile ? getEmployeeLabel(ticket.customer?.profile) : EMPTY_VALUE_DASH}
          </Box>
        </TableCell>
        <TableCell>
          {requisites?.physical_address?.region?.local_name ?? EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {requisites?.physical_address?.district || EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {vehicle?.model.brand.name || EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {vehicle?.model.name || EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {ticket.approval.want_start_date ? (
            <>
              <Box>
                {format(new Date(ticket.approval.want_start_date), DATE_FORMAT_TIME)}
              </Box>
              <Box>
                {format(new Date(ticket.approval.want_start_date), DATE_FORMAT_DEFAULT)}
              </Box>
            </>
          ) : EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          {ticket.approval.plan_start_date ? (
            <Box sx={{ fontWeight: '500' }}>
              <Box>
                {format(new Date(ticket.approval.plan_start_date), DATE_FORMAT_TIME)}
              </Box>
              <Box>
                {format(new Date(ticket.approval.plan_start_date), DATE_FORMAT_DEFAULT)}
              </Box>
            </Box>
          ) : EMPTY_VALUE_DASH}
        </TableCell>
        <TableCell>
          <TicketChipStatus status={ticket.status} />
        </TableCell>
        <TableCell>
          <EngineerAvatar
            profile={ticket.executor?.profile ?? null}
            rating={rating}
          />
        </TableCell>
        <TableCell>
          <EngineerAvatar
            profile={employees?.find(({ id }) => id === ticket.coordinator)?.profile ?? null}
            rating={null}
          />
        </TableCell>
        <TableCellActions>
          <Tooltip
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
          <Tooltip
            content={ticketStatusesEngineerEditable.some((status) => status === ticket.status) ? 'Назначить инженера' : 'Изменение инженера у выполненных задач невозможно'}
            strategy={'fixed'}
            placement={'left'}
            target={(
              <ButtonIcon
                Icon={ManageAccounts}
                fontSize={'18px'}
                disabled={!ticketStatusesEngineerEditable.some((status) => status === ticket.status)}
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
        selectedTaskID={ticket.id}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
