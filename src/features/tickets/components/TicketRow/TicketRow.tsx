import { useMemo, useState } from 'react'
import { ButtonContextActions } from '@components/ButtonContextActions'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { EMPTY_VALUE_DASH, TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { TicketDrawerContent } from '@features/tickets/components/TicketDrawerContent'
import { Drawer, TableCell, TableRow } from '@mui/material'
import { SerWorkTask } from '~/api/servicepro.generated'

export interface TicketRowProps {
  task: SerWorkTask
}

export const TicketRow = ({ task }: TicketRowProps) => {
  const [open, setOpen] = useState(false)
  const requisites = useMemo(() => task.organization?.requisites ?? null, [task.organization?.requisites])
  const vehicle = useMemo(() => task.vehicle ?? null, [task.vehicle])

  return (
    <>
      <TableRow
        sx={{
          cursor: 'pointer',
          '&:last-child td, &:last-child th': {
            border: 0,
          },
        }}
        hover
        onClick={() => setOpen(true)}
      >
        <TableCell
          size={'small'}
        >
          {task.id}
        </TableCell>
        <TableCell>
          {task.customer ?? EMPTY_VALUE_DASH}
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
          {/*{data.desiredDate}*/}
        </TableCell>
        <TableCell>
          {/*{data.approvedDate}*/}
        </TableCell>
        <TableCell>
          <ChipStatus status={task.status} />
        </TableCell>
        <TableCell>
          <EngineerAvatar />
          {/*<Typography*/}
          {/*  variant={'body2'}*/}
          {/*>*/}
          {/*  Петров И.А.{' '}*/}
          {/*  <Typography*/}
          {/*    component={'span'}*/}
          {/*    variant={'body2'}*/}
          {/*    fontWeight={700}*/}
          {/*    color={theme.palette.success.main}*/}
          {/*  >*/}
          {/*    (4.3)*/}
          {/*  </Typography>*/}
          {/*</Typography>*/}
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
      <Drawer
        open={open}
        anchor={'right'}
        onClose={() => setOpen(false)}
      >
        <TicketDrawerContent onClose={() => setOpen(false)} />
      </Drawer>
    </>
  )
}
