import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { EngineerRow } from '@features/engineers/components/EngineerRow'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TableSortLabel,
} from '@mui/material'

export const EngineersRoute = () => {
  return (
    <>
      <TableHeader
        amount={10}
        sx={{ marginTop: '8px' }}
      >
        Инженеры
      </TableHeader>
      {/*<FieldAutocompleteMultiple*/}
      {/*  name={'client'}*/}
      {/*  label={'Рейтинг'}*/}
      {/*  value={[]}*/}
      {/*  options={[]}*/}
      {/*  sx={{ width: '200px' }}*/}
      {/*  labelInside*/}
      {/*  onChange={() => {}}*/}
      {/*/>*/}
      {/*<FieldAutocompleteMultiple*/}
      {/*  name={'client'}*/}
      {/*  label={'Статус'}*/}
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
              />
              <TableCell
                size={'small'}
              >
                Инженеры СО
                <TableSortLabel
                  direction={'desc'}
                  active
                />
              </TableCell>
              <TableCell
                size={'small'}
              >
                Заявки
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
    </>
  )
}
