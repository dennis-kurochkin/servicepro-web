import { useState } from 'react'
import { ButtonContextActions } from '@components/ButtonContextActions'
import { EMPTY_VALUE_DASH, TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { TableCellTickets } from '@features/shared/components/TableCellTickets'
import { Box, Chip, TableCell, TableRow, Typography } from '@mui/material'
import { WorkOrganization } from '~/api/servicepro.generated'

export interface ClientRowProps {
  data: WorkOrganization
}

export const ClientRow = ({ data }: ClientRowProps) => {
  const [selectedTaskID, setSelectedTaskID] = useState<number | null>(data.tasks?.[0]?.number ?? null)

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
        <TableCellTickets
          selectedTaskID={selectedTaskID}
          tasks={data.tasks}
          onChangeSelectedTaskID={setSelectedTaskID}
        />
      </TableCell>
      <TableCell align={'center'}>
        <Box
          sx={{
            display: 'flex',
            gap: '4px',
            paddingLeft: '8px',
          }}
        >
          <Chip
            size={'medium'}
            label="3"
            color="primary"
          />
          <Chip
            size={'medium'}
            label="13"
            color="warning"
          />
          <Chip
            size={'medium'}
            label="2"
            color="info"
          />
        </Box>
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
