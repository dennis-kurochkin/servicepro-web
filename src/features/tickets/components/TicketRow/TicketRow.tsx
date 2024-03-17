import { useState } from 'react'
import { ButtonContextActions } from '@components/ButtonContextActions'
import { ChipStatus, ChipStatusProps } from '@components/ChipStatus/ChipStatus'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { TicketDrawerContent } from '@features/tickets/components/TicketDrawerContent'
import { Drawer, TableCell, TableRow } from '@mui/material'

export interface TicketRowProps {
  id: number
  data: {
    client: string
    region: string
    district: string
    brand: string
    model: string
    desiredDate: string
    approvedDate: string
  }
  status?: ChipStatusProps['status']
}

export const TicketRow = ({ id, data, status }: TicketRowProps) => {
  const [open, setOpen] = useState(false)

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
          {id}
        </TableCell>
        <TableCell>
          {data.client}
        </TableCell>
        <TableCell>
          {data.region}
        </TableCell>
        <TableCell>
          {data.district}
        </TableCell>
        <TableCell>
          {data.brand}
        </TableCell>
        <TableCell>
          {data.model}
        </TableCell>
        <TableCell>
          {data.desiredDate}
        </TableCell>
        <TableCell>
          {data.approvedDate}
        </TableCell>
        <TableCell>
          <ChipStatus status={status} />
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
