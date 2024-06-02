import { PropsWithChildren } from 'react'
import { PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { theme } from '@data/theme'
import { Paper, SxProps, TableContainer, TablePagination } from '@mui/material'

interface TableWrapperProps extends PropsWithChildren {
  sx?: SxProps
  pagination?: {
    page: number,
    count: number,
    rowsPerPage?: number,
    onPageChange: (page: number) => void
  }
}

export const TableWrapper = ({ pagination, children, sx }: TableWrapperProps) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        marginTop: '20px',
        background: 'none',
        border: `1px solid ${theme.palette.grey['300']}`,
        ...(sx ?? {}),
      }}
    >
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.count}
          rowsPerPage={pagination.rowsPerPage ?? PAGINATION_DEFAULT_LIMIT}
          rowsPerPageOptions={[{ value: PAGINATION_DEFAULT_LIMIT, label: '10' }]}
          page={pagination.page}
          sx={{
            borderBottom: `1px solid ${theme.palette.grey['300']}`,
          }}
          onPageChange={(_, page) => pagination.onPageChange(page)}
        />
      )}
      {children}
      {pagination && (
        <TablePagination
          component="div"
          count={pagination.count}
          rowsPerPage={pagination.rowsPerPage ?? PAGINATION_DEFAULT_LIMIT}
          rowsPerPageOptions={[{ value: PAGINATION_DEFAULT_LIMIT, label: '10' }]}
          page={pagination.page}
          sx={{
            borderTop: `1px solid ${theme.palette.grey['300']}`,
          }}
          onPageChange={(_, page) => pagination.onPageChange(page)}
        />
      )}
    </TableContainer>
  )
}
