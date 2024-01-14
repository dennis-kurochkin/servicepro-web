import { ButtonContextActions } from '@components/ButtonContextActions'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { Add } from '@mui/icons-material'
import {
  Chip,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'

export interface ClientRowProps {
  id: number
}

export const ClientRow = ({ id }: ClientRowProps) => {
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
        <Typography
          variant={'body2'}
        >
          Агротехник
        </Typography>
      </TableCell>
      <TableCell>
        г. Краснодар
      </TableCell>
      <TableCell>
        ул. Тестовская, с. 311
      </TableCell>
      <TableCell>
        Агротехник 13:00 05.06.2023
        <TableSortLabel
          direction={'desc'}
          sx={{ marginLeft: '4px' }}
          active
        />
        <IconButton
          size={'small'}
          color={'info'}
          sx={{ marginLeft: '4px' }}
        >
          <Add fontSize={'small'} />
        </IconButton>
      </TableCell>
      <TableCell align={'center'}>
        <Stack
          direction="row"
          spacing={1}
          justifyContent={'center'}
        >
          <Chip
            size={'small'}
            label="3"
            color="primary"
          />
          <Chip
            size={'small'}
            label="13"
            color="warning"
          />
          <Chip
            size={'small'}
            label="2"
            color="info"
          />
        </Stack>
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
