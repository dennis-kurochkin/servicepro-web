import { Map } from '@components/Map'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { TicketRow } from '@features/tickets/components/TicketRow'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TableSortLabel,
} from '@mui/material'

export const TicketsRoute = () => {
  // const [activeTab, setActiveTab] = useState(TicketsTab.Active)

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
        <TableHeader
          amount={32}
          sx={{ marginTop: '8px' }}
        >
          Заявки{' '}
          {/*<TicketsTabLink*/}
          {/*  tab={TicketsTab.Active}*/}
          {/*  activeTab={activeTab}*/}
          {/*  onClick={setActiveTab}*/}
          {/*/>*/}
          {/*{' / '}*/}
          {/*<TicketsTabLink*/}
          {/*  tab={TicketsTab.History}*/}
          {/*  activeTab={activeTab}*/}
          {/*  onClick={setActiveTab}*/}
          {/*/>*/}
        </TableHeader>
        {/*<FieldAutocompleteMultiple*/}
        {/*  name={'client'}*/}
        {/*  label={'Клиент'}*/}
        {/*  value={[]}*/}
        {/*  options={[]}*/}
        {/*  sx={{ width: '200px' }}*/}
        {/*  labelInside*/}
        {/*  onChange={() => {}}*/}
        {/*/>*/}
        {/*<FieldAutocompleteMultiple*/}
        {/*  name={'client'}*/}
        {/*  label={'Техника'}*/}
        {/*  value={[]}*/}
        {/*  options={[]}*/}
        {/*  sx={{ width: '250px' }}*/}
        {/*  labelInside*/}
        {/*  onChange={() => {}}*/}
        {/*/>*/}
        {/*<FieldAutocompleteMultiple*/}
        {/*  name={'client'}*/}
        {/*  label={'Статус'}*/}
        {/*  value={[]}*/}
        {/*  options={[]}*/}
        {/*  sx={{ width: '200px' }}*/}
        {/*  labelInside*/}
        {/*  onChange={() => {}}*/}
        {/*/>*/}
        {/*<FieldAutocompleteMultiple*/}
        {/*  name={'client'}*/}
        {/*  label={'Исполнитель'}*/}
        {/*  value={[]}*/}
        {/*  options={[]}*/}
        {/*  sx={{ width: '250px' }}*/}
        {/*  labelInside*/}
        {/*  onChange={() => {}}*/}
        {/*/>*/}
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
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Клиент
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Регион
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Район
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Бренд
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Модель
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Желаемое время
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Согласованное
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Статус
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  size={'small'}
                >
                  Инженер
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
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
                  id={index + 1}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      </Container>
    </>
  )
}
