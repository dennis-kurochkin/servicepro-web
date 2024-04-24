import { PropsWithChildren } from 'react'
import { Box, TableCell, TableSortLabel } from '@mui/material'

export const TableCellHeadFilter = ({ children }: PropsWithChildren) => {
  return (
    <TableCell
      size={'small'}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {children}
        <TableSortLabel
          direction={'desc'}
          active
        />
      </Box>
    </TableCell>
  )
}
