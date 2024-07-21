import { useState } from 'react'
import { PanelDataAbsent } from '@components/PanelDataAbsent'
import { TableWrapper } from '@components/TableWrapper/TableWrapper'
import { DATE_FORMAT_TIME_BEHIND, EMPTY_VALUE_DASH } from '@constants/index'
import { EngineerAvatar } from '@features/engineers/components/EngineerAvatar'
import { QueryKey } from '@features/shared/data'
import { VehicleDrawerDocumentationAdd } from '@features/vehicles/components/VehicleDrawerDocumentationAdd'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { Add } from '@mui/icons-material'
import {
  Box,
  Button, Link,
  Skeleton,
  Table, TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

interface VehicleTabDocumentationProps {
  vehicleID: number
}

export const VehicleTabDocumentation = ({ vehicleID }: VehicleTabDocumentationProps) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const [addDrawerOpen, setAddDrawerOpen] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [QueryKey.VehicleDocuments, vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.vehicleSersVehiclesDocsList({
        orgId: organizationID.toString(),
        vehicleId: vehicleID.toString(),
      })

      return data
    },
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: '-8px',
          marginBottom: '8px',
        }}
      >
        <Button
          color={'info'}
          variant={'contained'}
          startIcon={<Add />}
          disableElevation
          onClick={() => setAddDrawerOpen(true)}
        >
          Добавить документацию
        </Button>
      </Box>
      {isFetching ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              width={'100%'}
              height={80}
              variant={'rounded'}
            />
          ))}
        </>
      ) : (
        <>
          {isSuccess && data.length > 0 ? (
            <>
              <TableWrapper
                sx={{
                  margin: 0,
                }}
              >
                <Table
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
                        Наименование
                      </TableCell>
                      <TableCell
                        size={'small'}
                      >
                        Ссылка
                      </TableCell>
                      <TableCell
                        size={'small'}
                      >
                        Дата&nbsp;создания
                      </TableCell>
                      <TableCell
                        size={'small'}
                      >
                        Автор
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((document) => (
                      <TableRow
                        key={document.id}
                      >
                        <TableCell>
                          {document.id}
                        </TableCell>
                        <TableCell>
                          {document.title || 'Текст отсутствует'}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              maxWidth: '600px',
                            }}
                          >
                            <Link
                              href={document.file}
                              target={'_blank'}
                              sx={{
                                wordWrap: 'break-all',
                                overflowWrap: 'break-word',
                              }}
                            >
                              {document.file}
                            </Link>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {document.created_at ? format(new Date(document.created_at), DATE_FORMAT_TIME_BEHIND) : EMPTY_VALUE_DASH}
                        </TableCell>
                        <TableCell
                          sx={{
                            paddingRight: '16px',
                          }}
                        >
                          <EngineerAvatar
                            profile={document.author?.profile ?? null}
                            emptyLabel={'Отсутствует'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            </>
          ) : <PanelDataAbsent />}
        </>
      )}
      <VehicleDrawerDocumentationAdd
        open={addDrawerOpen}
        vehicleID={vehicleID}
        onClose={() => setAddDrawerOpen(false)}
      />
    </Box>
  )
}
