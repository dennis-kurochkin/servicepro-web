import useInfiniteScroll from 'react-infinite-scroll-hook'
import { TableHeader } from '@components/TableHeader'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { PAGINATION_DEFAULT_LIMIT, TABLE_CELL_DENSE_PADDING, TABLE_CONTEXT_BUTTON_CELL_WIDTH } from '@constants/index'
import { ClientRow } from '@features/clients/components/ClientRow'
import { QueryKey } from '@features/shared/data'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import {
  Box, CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TableSortLabel,
} from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'

export const ClientsRoute = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const { data, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage, status } = useInfiniteQuery({
    queryKey: [QueryKey.Clients, organizationID],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.workSersOrgsList({
        orgId: organizationID.toString(),
        limit: PAGINATION_DEFAULT_LIMIT,
        offset: pageParam * PAGINATION_DEFAULT_LIMIT,
      })

      return data ?? []
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => lastPage.length === 0 ? null : allPages.length,
    refetchOnWindowFocus: false,
  })

  const [sentryRef] = useInfiniteScroll({
    loading: isFetching || isFetchingNextPage,
    hasNextPage,
    onLoadMore: fetchNextPage,
  })

  return (
    <>
      <TableHeader
        sx={{ marginTop: '8px' }}
      >
        Клиенты
      </TableHeader>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
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
                />
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
                  Заявки
                  <TableSortLabel
                    direction={'desc'}
                    active
                  />
                </TableCell>
                <TableCell
                  align={'center'}
                  size={'small'}
                >
                  Рекомендации
                  <TableSortLabel
                    direction={'desc'}
                    sx={{ marginRight: '-20px' }}
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
              {status === 'success' && (
                <>
                  {data.pages.map((page, index) => (
                    <>
                      {page.map((client) => (
                        <ClientRow
                          key={index}
                          data={client}
                        />
                      ))}
                    </>
                  ))}
                </>
              )}
              {(isFetching || isFetchingNextPage || hasNextPage) && (
                <TableRow
                  ref={sentryRef}
                >
                  <TableCell
                    colSpan={7}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <CircularProgress
                        color={'info'}
                        size={36}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {/*{!isFetching && !isFetchingNextPage && !hasNextPage && (*/}
              {/*  <TableRow>*/}
              {/*    <TableCell*/}
              {/*      colSpan={7}*/}
              {/*    >*/}
              {/*      <Box*/}
              {/*        sx={{*/}
              {/*          display: 'flex',*/}
              {/*          justifyContent: 'center',*/}
              {/*          alignItems: 'center',*/}
              {/*          gap: '6px',*/}
              {/*          padding: '4px 0',*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        <CheckCircle*/}
              {/*          color={'success'}*/}
              {/*          fontSize={'small'}*/}
              {/*        />*/}
              {/*        <Typography*/}
              {/*          variant={'body2'}*/}
              {/*        >*/}
              {/*          Все клиенты загружены*/}
              {/*        </Typography>*/}
              {/*      </Box>*/}
              {/*    </TableCell>*/}
              {/*  </TableRow>*/}
              {/*)}*/}
            </TableBody>
          </Table>
        </TableWrapper>
      </Box>
    </>
  )
}
