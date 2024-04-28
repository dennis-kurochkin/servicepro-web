import { PropsWithChildren } from 'react'
import { TABLE_CELL_DENSE_PADDING } from '@constants/index'
import { Box, TableCell } from '@mui/material'

export const TableCellActions = ({ children }: PropsWithChildren) => {
  return (
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
        {children}
      </Box>
    </TableCell>
  )
}
