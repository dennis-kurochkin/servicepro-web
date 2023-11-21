import { useState } from 'react'
import { FieldAutocompleteMultiple, FieldInput } from '@components/Field'
import { Map } from '@components/Map'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { theme } from '@data/theme'
import { TicketRow } from '@features/tickets/components/TicketRow'
import {
  Search,
} from '@mui/icons-material'
import {
  Box, Button,
  Container,
  InputAdornment, Link,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow,
  Typography,
} from '@mui/material'

enum TicketsTab {
  Active = 'active',
  History = 'history'
}

export const TicketsRoute = () => {
  const [activeTab, setActiveTab] = useState(TicketsTab.Active)

  return (
    <>
      <Map
        sx={{
          height: '45vh',
          minHeight: '328px',
          maxHeight: '500px',
        }}
      />
      <Container
        maxWidth={'xl'}
        sx={{
          paddingTop: '24px',
        }}
      >
        <Typography
          variant={'h5'}
        >
            Заявки{' '}
          <Link
            component={Button}
            sx={{
              padding: 0,
              textTransform: 'none',
              verticalAlign: 'baseline',
              '&:hover': {
                textDecoration: activeTab === TicketsTab.History ? 'underline' : undefined,
                background: 'none',
              },
            }}
            color={activeTab === TicketsTab.Active ? theme.palette.primary.main : theme.palette.text.primary}
            disableRipple
            onClick={() => setActiveTab(TicketsTab.Active)}
          >
            активные
          </Link>
          {' / '}
          <Link
            component={Button}
            sx={{
              padding: 0,
              textTransform: 'none',
              verticalAlign: 'baseline',
              '&:hover': {
                textDecoration: activeTab === TicketsTab.Active ? 'underline' : undefined,
                background: 'none',
              },
            }}
            color={activeTab === TicketsTab.History ? theme.palette.primary.main : theme.palette.text.primary}
            disableRipple
            onClick={() => setActiveTab(TicketsTab.History)}
          >
            история
          </Link>
          <Box
            component={'span'}
          >
            {' (3)'}
          </Box>
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
            label={'Клиент'}
            value={[]}
            options={[]}
            sx={{ width: '200px' }}
            labelInside
            onChange={() => {}}
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
            label={'Статус'}
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
          <Table
            sx={{ minHeight: 200 }}
            size={'small'}
            aria-label="simple table"
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
                  size={'small'}
                >
                  Техника
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Дата и время
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Статус
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
                <TicketRow
                  key={index}
                />
              ))}
            </TableBody>
          </Table>
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
      </Container>
    </>
  )
}
