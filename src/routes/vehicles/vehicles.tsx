import { FieldAutocompleteMultiple, FieldInput } from '@components/Field'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { theme } from '@data/theme'
import { VehicleRow } from '@features/vehicles/components/VehicleRow'
import { Search } from '@mui/icons-material'
import {
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

export const VehiclesRoute = () => {
  return (
    <>
      <Typography
        variant={'h5'}
      >
        Техника (20)
      </Typography>
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
          label={'Техника'}
          value={[]}
          options={[]}
          sx={{ width: '250px' }}
          labelInside
          onChange={() => {}}
        />
        <FieldAutocompleteMultiple
          name={'client'}
          label={'Тип'}
          value={[]}
          options={[]}
          sx={{ width: '200px' }}
          labelInside
          onChange={() => {}}
        />
        <FieldAutocompleteMultiple
          name={'client'}
          label={'Клиент'}
          value={[]}
          options={[]}
          sx={{ width: '200px' }}
          labelInside
          onChange={() => {}}
        />
        <FieldAutocompleteMultiple
          name={'client'}
          label={'Исполнитель'}
          value={[]}
          options={[]}
          sx={{ width: '250px' }}
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
                  Техника
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Тип
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Заводской номер
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Наработка
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Клиент
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Исполнитель
                </TableCell>
                <TableCell
                  size={'small'}
                  sx={{ width: TABLE_CONTEXT_BUTTON_CELL_WIDTH, paddingRight: TABLE_CELL_DENSE_PADDING }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 20 }).map((_, index) => (
                <VehicleRow
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
