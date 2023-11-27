import { FieldAutocompleteMultiple, FieldInput } from '@components/Field'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { theme } from '@data/theme'
import { EngineerRow } from '@features/engineers/components/EngineerRow'
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

export const EngineersRoute = () => {
  return (
    <>
      <Badge
        color={'primary'}
        badgeContent={10}
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
          Инженеры
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
          label={'Рейтинг'}
          value={[]}
          options={[]}
          sx={{ width: '200px' }}
          labelInside
          onChange={() => {}}
        />
        <FieldAutocompleteMultiple
          name={'client'}
          label={'Статус'}
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
                  Инженер
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Статус
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
                <EngineerRow
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
