import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonContextActions } from '@components/ButtonContextActions'
import { ButtonIcon } from '@components/ButtonIcon'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { DATE_FORMAT_TIME_AHEAD, EMPTY_VALUE_DASH, TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { GpsFixedOutlined, GpsNotFixed } from '@mui/icons-material'
import { Box, TableCell, TableRow } from '@mui/material'
import { format } from 'date-fns'
import { SerWorkTaskVerbose } from '~/api/servicepro.generated'

export interface TicketRowProps {
  task: SerWorkTaskVerbose
  selected: boolean
  onSelect: () => void
}

/**
 *
 * описание от клиента в чате, координатор может его редактировать, после редакции нужна отметка,
 * что описание было отредактировано координатором
 */

export const TicketRow = ({ task, selected, onSelect }: TicketRowProps) => {
  const navigate = useNavigate()
  const { organizationID } = useOrganizationID()

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
          {task.customer?.profile ? (
            <>
              {task.customer.profile?.last_name}{'\u00A0'}
              {task.customer.profile?.first_name ? `${task.customer.profile.first_name[0].toUpperCase()}.\u00A0` : ''}
              {task.customer.profile?.middle_name ? `${task.customer.profile.middle_name[0].toUpperCase()}.\u00A0` : ''}
            </>
          ) : EMPTY_VALUE_DASH}
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
          <ChipStatus status={task.status} />
        </TableCell>
        <TableCell>
          <EngineerAvatar
            profile={task.executor.profile}
          />
        </TableCell>
        <TableCell
          sx={{ paddingRight: TABLE_CELL_DENSE_PADDING }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <ButtonIcon
              Icon={selected ? GpsFixedOutlined : GpsNotFixed}
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
            />
            <ButtonContextActions
              onClick={(e) => {
                e.stopPropagation()
              }}
            />
          </Box>
        </TableCell>
      </TableRow>

    </>
  )
}
