import { PropsWithChildren } from 'react'
import { theme } from '@data/theme'
import { Paper, TableContainer } from '@mui/material'

interface TableWrapperProps extends PropsWithChildren {
  pagination?: {
    page: number,
    count: number,
    rowsPerPage?: number,
  }
}

export const TableWrapper = ({ children }: TableWrapperProps) => {
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
      {/*<TablePagination*/}
      {/*  component="div"*/}
      {/*  count={pagination.count}*/}
      {/*  rowsPerPage={pagination.rowsPerPage ?? PAGINATION_DEFAULT_LIMIT}*/}
      {/*  rowsPerPageOptions={[{ value: PAGINATION_DEFAULT_LIMIT, label: '10' }]}*/}
      {/*  page={pagination.page}*/}
      {/*  sx={{*/}
      {/*    borderBottom: `1px solid ${theme.palette.grey['300']}`,*/}
      {/*  }}*/}
      {/*  onPageChange={() => {}}*/}
      {/*/>*/}
      {children}
      {/*<TablePagination*/}
      {/*  component="div"*/}
      {/*  count={pagination.count}*/}
      {/*  rowsPerPage={pagination.rowsPerPage ?? PAGINATION_DEFAULT_LIMIT}*/}
      {/*  rowsPerPageOptions={[{ value: PAGINATION_DEFAULT_LIMIT, label: '10' }]}*/}
      {/*  page={pagination.page}*/}
      {/*  sx={{*/}
      {/*    borderTop: `1px solid ${theme.palette.grey['300']}`,*/}
      {/*  }}*/}
      {/*  onPageChange={() => {}}*/}
      {/*/>*/}
    </TableContainer>
  )
}
