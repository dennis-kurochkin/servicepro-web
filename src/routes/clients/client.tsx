import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EMPTY_VALUE_DASH, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { QueryKey } from '@features/shared/data'
import { TicketsTable } from '@features/tickets/components/TicketsTable'
import { VehiclesTable } from '@features/vehicles/components/VehiclesTable'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { ArrowLeft } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Skeleton, Tab, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

enum ClientTab {
  Vehicles = 'vehicles',
  Tickets = 'tickets',
  Requisites = 'requisites',
}

const ClientTabLabel: Record<ClientTab, string> = {
  [ClientTab.Vehicles]: 'Техника',
  [ClientTab.Tickets]: 'Заявки',
  [ClientTab.Requisites]: 'Реквизиты',
}

export const ClientRoute = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const clientID = useMemo(() => +(params.clientID || '-1'), [params])
  const [tab, setTab] = useState(ClientTab.Vehicles)
  const [ticketsCount, setTicketsCount] = useState(0)
  const [ticketsPage, setTicketsPage] = useState(0)

  const { data, isFetching } = useQuery({
    queryKey: [QueryKey.Client, clientID, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersOrgsRetrieve(clientID, organizationID.toString())
      return data
    },
  })

  const ticketsQuery = useQuery({
    queryKey: [QueryKey.ClientTickets, ticketsPage, organizationID],
    queryFn: async () => {
      const options = {
        orgId: organizationID.toString(),
        customer: clientID,
        offset: ticketsPage * PAGINATION_DEFAULT_LIMIT,
        limit: PAGINATION_DEFAULT_LIMIT,
      }

      const { data, headers } = await api.workSersTasksVerboseList(options)

      setTicketsCount(headers['x-count'] ? +headers['x-count'] : 0)

      return data ?? []
    },
    refetchOnWindowFocus: false,
  })

  const info = useMemo(() => {
    if (!data) {
      return []
    }

    return [
      {
        title: 'Регион',
        value: data.requisites?.legal_address?.region?.local_name ?? data.requisites?.physical_address?.region?.local_name ?? data.requisites?.postal_address?.region?.local_name ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'Район',
        value: data.requisites?.legal_address?.value ?? data.requisites?.physical_address?.value ?? data.requisites?.postal_address?.value ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'Фактический адрес',
        value: data?.requisites.physical_address?.value ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'Юридический адрес',
        value: data?.requisites.legal_address?.value ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'Адрес для корреспонденции',
        value: data?.requisites.postal_address?.value ?? EMPTY_VALUE_DASH,
      },
    ]
  }, [data])

  const requisites = useMemo(() => {
    if (!data) {
      return []
    }

    return [
      {
        title: 'КПП',
        value: data.requisites?.kpp ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'ОРГН',
        value: data.requisites?.ogrn ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'ИНН',
        value: data.requisites?.inn ?? EMPTY_VALUE_DASH,
      },
    ]
  }, [data])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Button
          variant={'outlined'}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Вернуться
        </Button>
        <Typography
          variant={'h5'}
          sx={{
            marginTop: '20px',
          }}
        >
          {isFetching ? (
            <Skeleton
              variant={'rounded'}
              sx={{
                position: 'relative',
                bottom: '-4px',
                display: 'inline-block',
                width: '300px',
                height: '28px',
                margin: '0 8px',
              }}
            />
          ) : (
            <>
              {data?.requisites?.full_name ?? data?.name ?? 'Клиент без названия'}
            </>
          )}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: '4px',
            minWidth: '700px',
            padding: '24px 48px 24px 24px',
            marginTop: '24px',
            borderRadius: '8px',
            border: '1px solid',
            borderColor: (theme) => theme.palette.grey['300'],
            background: (theme) => theme.palette.grey['100'],
          }}
        >
          {info.map(({ title, value }, index) => (
            <Box
              key={index}
              sx={{
                display: 'grid',
                gridTemplateColumns: '240px 1fr',
                gap: '16px',
              }}
            >
              <Typography
                variant={'body1'}
                sx={{ color: (theme) => theme.palette.grey['700'] }}
              >
                {title}:
              </Typography>
              <Typography
                variant={'body1'}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
        <TabContext value={tab}>
          <Box sx={{
            width: '100%',
            marginTop: '24px',
            borderBottom: 1,
            borderColor: 'divider',
          }}
          >
            <TabList
              onChange={(_, value) => setTab(value)}
            >
              <Tab
                label={ClientTabLabel[ClientTab.Vehicles]}
                value={ClientTab.Vehicles}
              />
              <Tab
                label={ClientTabLabel[ClientTab.Tickets]}
                value={ClientTab.Tickets}
              />
              <Tab
                label={ClientTabLabel[ClientTab.Requisites]}
                value={ClientTab.Requisites}
              />
            </TabList>
          </Box>
          <TabPanel
            value={ClientTab.Vehicles}
            sx={{ paddingX: 0, width: '100%' }}
          >
            <VehiclesTable
              data={[]}
              sx={{ margin: 0 }}
              isSuccess={false}
            />
          </TabPanel>
          <TabPanel
            value={ClientTab.Tickets}
            sx={{ paddingX: 0, width: '100%' }}
          >
            <TicketsTable
              page={ticketsPage}
              count={ticketsCount}
              isSuccess={ticketsQuery.isSuccess}
              data={ticketsQuery.data ?? []}
              onPageChange={setTicketsPage}
            />
          </TabPanel>
          <TabPanel
            value={ClientTab.Requisites}
            sx={{ paddingX: 0 }}
          >
            {requisites.map(({ title, value }, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '16px',
                }}
              >
                <Typography
                  variant={'body1'}
                  sx={{ color: (theme) => theme.palette.grey['700'] }}
                >
                  {title}:
                </Typography>
                <Typography
                  variant={'body1'}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
