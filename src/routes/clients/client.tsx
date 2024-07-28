import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageEntityHeader } from '@components/PageEntityHeader'
import { EMPTY_VALUE_DASH, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { PanelInfo } from '@features/shared/components/PanelInfo'
import { QueryKey } from '@features/shared/data'
import { LabelValue } from '@features/shared/types'
import { TicketsTable } from '@features/tickets/components/TicketsTable'
import { VehiclesTable } from '@features/vehicles/components/VehiclesTable'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { WorkSersTasksListParams } from '~/api/servicepro.generated'

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
    queryKey: [QueryKey.ClientTickets, clientID, ticketsPage, organizationID],
    queryFn: async () => {
      const options: WorkSersTasksListParams = {
        orgId: organizationID.toString(),
        offset: ticketsPage * PAGINATION_DEFAULT_LIMIT,
        customer: [clientID.toString()],
        limit: PAGINATION_DEFAULT_LIMIT,
      }

      const { data, headers } = await api.workSersTasksVerboseList(options)

      setTicketsCount(headers['x-count'] ? +headers['x-count'] : 0)

      return data ?? []
    },
    refetchOnWindowFocus: false,
  })

  const info = useMemo((): LabelValue[] => {
    return [
      {
        label: 'Регион',
        value: data?.requisites?.legal_address?.region?.local_name ?? data?.requisites?.physical_address?.region?.local_name ?? data?.requisites?.postal_address?.region?.local_name ?? EMPTY_VALUE_DASH,
      },
      {
        label: 'Район',
        value: data?.requisites?.legal_address?.value ?? data?.requisites?.physical_address?.value ?? data?.requisites?.postal_address?.value ?? EMPTY_VALUE_DASH,
      },
      {
        label: 'Фактический адрес',
        value: data?.requisites.physical_address?.value ?? EMPTY_VALUE_DASH,
      },
      {
        label: 'Юридический адрес',
        value: data?.requisites.legal_address?.value ?? EMPTY_VALUE_DASH,
      },
      {
        label: 'Адрес для корреспонденции',
        value: data?.requisites.postal_address?.value ?? EMPTY_VALUE_DASH,
      },
    ]
  }, [data])

  const requisites = useMemo(() => {
    return [
      {
        title: 'КПП',
        value: data?.requisites?.kpp ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'ОРГН',
        value: data?.requisites?.ogrn ?? EMPTY_VALUE_DASH,
      },
      {
        title: 'ИНН',
        value: data?.requisites?.inn ?? EMPTY_VALUE_DASH,
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
        <PageEntityHeader
          title={data?.requisites?.full_name ?? data?.name ?? 'Клиент без названия'}
          isFetching={isFetching}
        />
        <PanelInfo
          info={info}
          labelWidth={230}
          isFetching={isFetching}
          sx={{ marginTop: '24px' }}
        />
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
              sx={{ margin: 0 }}
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
