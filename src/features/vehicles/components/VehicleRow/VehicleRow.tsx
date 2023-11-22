import { ButtonContextActions } from '@components/ButtonContextActions'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { theme } from '@data/theme'
import { AgricultureOutlined } from '@mui/icons-material'
import { TableCell, TableRow, Typography } from '@mui/material'

export const VehicleRow = () => {
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
        John Deere 9630
      </TableCell>
      <TableCell>
        <AgricultureOutlined />
      </TableCell>
      <TableCell>
        DFHWE6722GNNSSD2009
      </TableCell>
      <TableCell>
        500мч
      </TableCell>
      <TableCell>
        Агротехник
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
