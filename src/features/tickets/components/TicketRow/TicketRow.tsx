import { ButtonContextActions } from '@components/ButtonContextActions'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { theme } from '@data/theme'
import { Chip, TableCell, TableRow, Typography } from '@mui/material'

export const TicketRow = () => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        351
      </TableCell>
      <TableCell>
        Агротехник
      </TableCell>
      <TableCell>
        г. Краснодар, ул. Тестовская, с. 311
      </TableCell>
      <TableCell>
        John Deere 9630
      </TableCell>
      <TableCell>
        13.11.2023 15:30 / 15.11.2023 16:00
      </TableCell>
      <TableCell>
        <Chip
          size={'small'}
          label="Выполнена"
          color="success"
          variant="filled"
        />
      </TableCell>
      <TableCell>
        <Typography
          variant={'body2'}
        >
          Петров И.А.{' '}
          <Typography
            component={'span'}
            variant={'body2'}
            fontWeight={700}
            color={theme.palette.success.main}
          >
            (4.3)
          </Typography>
        </Typography>
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
