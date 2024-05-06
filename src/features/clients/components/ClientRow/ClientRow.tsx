import { ButtonContextActions } from '@components/ButtonContextActions'
import { EMPTY_VALUE_DASH, TABLE_CELL_DENSE_PADDING } from '@constants/index'
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
import { WorkOrganization } from '~/api/servicepro.generated'

export interface ClientRowProps {
  data: WorkOrganization
}

export const ClientRow = ({ data }: ClientRowProps) => {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell
        size={'small'}
      >
        {data.id}
      </TableCell>
      <TableCell>
        <Typography
          variant={'body2'}
        >
          {data.name}
        </Typography>
      </TableCell>
      <TableCell>
        {data.requisites?.legal_address?.region?.local_name ?? data.requisites?.physical_address?.region?.local_name ?? data.requisites?.postal_address?.region?.local_name ?? EMPTY_VALUE_DASH}
      </TableCell>
      <TableCell>
        {data.requisites?.legal_address?.value ?? data.requisites?.physical_address?.value ?? data.requisites?.postal_address?.value ?? EMPTY_VALUE_DASH}
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
