import { FieldAutocompleteMultiple, FieldInput } from '@components/Field'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { theme } from '@data/theme'
import { ClientRow } from '@features/clients/components/ClientRow'
import { Search } from '@mui/icons-material'
import {
  Badge,
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

export const ClientsRoute = () => {
  return (
    <>
      <Badge
        color={'primary'}
        badgeContent={67}
        overlap={'rectangular'}
        sx={{
          '& > .MuiBadge-badge': {
            top: '4px',
            right: '-4px',
          },
        }}
      >
        <Typography
          variant={'h5'}
        >
          Клиенты
        </Typography>
      </Badge>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '16px',
        }}
      >
        <FieldInput
          value={''}
          name={'search'}
          placeholder={'Поиск'}
          sx={{ width: '260px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FieldAutocompleteMultiple
          name={'client'}
          label={'Рекомендации'}
          value={[]}
          options={[]}
          sx={{ width: '200px' }}
          labelInside
          onChange={() => {}}
        />
      </Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          marginTop: '24px',
          border: `1px solid ${theme.palette.grey['300']}`,
        }}
      >
        <TableWrapper>
          <Table
            sx={{ minHeight: 200 }}
            size={'small'}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  size={'small'}
                >
                  ID
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Клиент
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Адрес
                </TableCell>
                <TableCell
                  align={'center'}
                  size={'small'}
                >
                  Рекомендации
                </TableCell>
                <TableCell />
                <TableCell
                  size={'small'}
                  sx={{ width: TABLE_CONTEXT_BUTTON_CELL_WIDTH, paddingRight: TABLE_CELL_DENSE_PADDING }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 20 }).map((_, index) => (
                <ClientRow
                  key={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </TableContainer>
    </>
  )
}
