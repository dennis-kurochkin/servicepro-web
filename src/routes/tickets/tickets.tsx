import { useState } from 'react'
import { FieldAutocompleteMultiple, FieldInput } from '@components/Field'
import { Map } from '@components/Map'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { theme } from '@data/theme'
import { TicketRow } from '@features/tickets/components/TicketRow'
import { TicketsTabLink } from '@features/tickets/components/TicketsTabLink/TicketsTabLink'
import { TicketsTab } from '@features/tickets/data'
import { Search } from '@mui/icons-material'
import {
  Box,
  Container,
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
          <TicketsTabLink
            tab={TicketsTab.Active}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
          {' / '}
          <TicketsTabLink
            tab={TicketsTab.History}
            activeTab={activeTab}
            onClick={setActiveTab}
          />
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
          </TableWrapper>
        </TableContainer>
      </Container>
    </>
  )
}
