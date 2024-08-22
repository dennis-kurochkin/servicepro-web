import { useState } from 'react'
import { FieldInputSearch } from '@components/FieldInputSearch'
import { InformerNoResults } from '@components/InformerNoResults'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { DEBOUNCE_DELAY_DEFAULT } from '@constants/index'
import { EngineerRow } from '@features/engineers/components/EngineerRow'
import { useEngineersTasksList } from '@features/shared/hooks/useEngineersTasksList'
import { usePageTitle } from '@hooks/usePageTitle'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'

export const EngineersRoute = () => {
  usePageTitle('Инженеры')

  const [query, setQuery] = useState('')
  const queryDebounced = useDebounce(query, DEBOUNCE_DELAY_DEFAULT)

  const { data, isFetching } = useEngineersTasksList(queryDebounced)

  return (
    <div>
      <TableHeader
        sx={{ marginTop: '8px' }}
        renderSearch={(
          <FieldInputSearch
            value={query}
            placeholder={'Поиск по инженеру'}
            onChange={(event) => setQuery(event.target.value)}
          />
        )}
      >
        Инженеры
      </TableHeader>
      {!isFetching && !data.length && (
        <InformerNoResults
          title={'Инженеры не найдены'}
          subtitle={'Возможно они еще не были добавлены'}
          filtered={!!queryDebounced}
          actions={(
            <Button
              variant={'outlined'}
              color={'info'}
              onClick={() => setQuery('')}
            >
              Очистить всё
            </Button>
          )}
          sx={{
            marginTop: '20px',
          }}
        />
      )}
      {(isFetching || data.length > 0) && (
        <TableWrapper>
          <Table
            size={'small'}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  size={'small'}
                >
                Инженеры СО
                </TableCell>
                <TableCell
                  size={'small'}
                >
                Заявки
                </TableCell>
                <TableCell
                  size={'small'}
                >
                Статус
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((engineer, index) => (
                <EngineerRow
                  key={index}
                  data={engineer}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      )}
    </div>
  )
}
