import { PropsWithChildren } from 'react'
import { theme } from '@data/theme'
import { Paper, TableContainer, TablePagination } from '@mui/material'

export const TableWrapper = ({ children }: PropsWithChildren) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        marginTop: '20px',
        background: 'none',
        border: `1px solid ${theme.palette.grey['300']}`,
      }}
    >
      <TablePagination
        component="div"
        count={50}
        rowsPerPage={20}
        rowsPerPageOptions={[{ value: 20, label: '20' }]}
        page={2}
        sx={{
          borderBottom: `1px solid ${theme.palette.grey['300']}`,
        }}
        onPageChange={() => {}}
      />
      {children}
      <TablePagination
        component="div"
        count={50}
        rowsPerPage={20}
        rowsPerPageOptions={[{ value: 20, label: '20' }]}
        page={2}
        sx={{
          borderTop: `1px solid ${theme.palette.grey['300']}`,
        }}
        onPageChange={() => {}}
      />
    </TableContainer>
  )
}
