import { ButtonContextActions } from '@components/ButtonContextActions'
import { ChipStatus } from '@components/ChipStatus/ChipStatus'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { TableCell, TableRow } from '@mui/material'

export interface TicketRowProps {
  id: number
}

export const TicketRow = ({ id }: TicketRowProps) => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        {id}
      </TableCell>
      <TableCell>
        «Путиловец» ООО
      </TableCell>
      <TableCell>
        г. Краснодар
      </TableCell>
      <TableCell>
        ул. Тестовская, с. 311
      </TableCell>
      <TableCell>
        John Deere
      </TableCell>
      <TableCell>
        9630
      </TableCell>
      <TableCell>
        13.11.2023 15:30
      </TableCell>
      <TableCell>
        15.11.2023 16:00
      </TableCell>
      <TableCell>
        <ChipStatus />
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
  )
}
