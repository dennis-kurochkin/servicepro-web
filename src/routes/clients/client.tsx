import { Fragment, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import TelegramIcon from '@assets/telegram.svg'
import WhatsAppIcon from '@assets/whatsapp.svg'
import { PageEntityHeader } from '@components/PageEntityHeader'
import { EMPTY_VALUE_DASH, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { getEmployeeFullName } from '@features/engineers/helpers'
import { PanelInfo } from '@features/shared/components/PanelInfo'
import { QueryKey } from '@features/shared/data'
import { TicketsTable } from '@features/tickets/components/TicketsTable'
import { VehiclesTable } from '@features/vehicles/components/VehiclesTable'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { usePageTitle } from '@hooks/usePageTitle'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Link, Tab, Typography } from '@mui/material'
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

  usePageTitle('Данные клиента')

  const ticketsQuery = useQuery({
    queryKey: [QueryKey.ClientTickets, clientID, ticketsPage, organizationID],
    queryFn: async () => {
      const options: WorkSersTasksListParams = {
        orgId: organizationID.toString(),
        offset: ticketsPage * PAGINATION_DEFAULT_LIMIT,
        organization: [clientID.toString()],
        limit: PAGINATION_DEFAULT_LIMIT,
      }

      const { data, headers } = await api.workSersTasksVerboseList(options)

      setTicketsCount(headers['x-count'] ? +headers['x-count'] : 0)

      return data ?? []
    },
    refetchOnWindowFocus: false,
  })

  const vehiclesQuery = useQuery({
    queryKey: [QueryKey.ClientVehicles, clientID, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersVehiclesList({
        orgId: organizationID.toString(),
        organization: [clientID.toString()],
      })

      return data
    },
  })

  const employeesQuery = useQuery({
    queryKey: [QueryKey.ClientEmployees, clientID, organizationID],
    queryFn: async () => {
      const { data } = await api.orgSersRelatedOrgsEmployeesList({
        orgId: organizationID.toString(),
        relatedId: clientID.toString(),
      })

      return data
    },
  })

  const info = useMemo(() => {
    return [
      {
        label: 'Регион',
        value: data?.requisites?.physical_address?.region?.local_name || EMPTY_VALUE_DASH,
      },
      {
        label: 'Район',
        value: data?.requisites?.physical_address?.district || EMPTY_VALUE_DASH,
      },
      {
        label: 'Фактический адрес',
        value: data?.requisites.physical_address?.value ?? EMPTY_VALUE_DASH,
      },
      {
        label: 'Контакты',
        value: (
          <Box
            sx={{
              display: 'grid',
              gap: '4px',
              gridTemplateColumns: '1fr 1.75fr .85fr .4fr',
            }}
          >
            {employeesQuery.data ? employeesQuery.data.map((employee) => (
              <Fragment
                key={employee.id}
              >
                <Box>
                  {employee.profile.position || EMPTY_VALUE_DASH}
                </Box>
                <Box>
                  {getEmployeeFullName(employee.profile) || EMPTY_VALUE_DASH}
                </Box>
                <Box>
                  {employee.profile.phone_number || EMPTY_VALUE_DASH}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    paddingTop: '2px',
                    gap: '8px',
                  }}
                >
                  {employee.profile.telegram && (
                    <Link
                      component={'a'}
                      href={`https://t.me/${employee.profile.telegram}`}
                      target={'_blank'}
                    >
                      <img
                        src={TelegramIcon}
                        alt='telegram'
                        style={{ display: 'block' }}
                        width={20}
                        height={20}
                      />
                    </Link>
                  )}
                  {employee.profile.whatsapp && (
                    <Link
                      component={'a'}
                      href={`https://wa.me/${employee.profile.whatsapp}`}
                      target={'_blank'}
                      sx={{ marginTop: '-3px' }}
                    >
                      <img
                        src={WhatsAppIcon}
                        alt='telegram'
                        style={{ display: 'block' }}
                        width={26}
                        height={26}
                      />
                    </Link>
                  )}
                </Box>
              </Fragment>
            )) : EMPTY_VALUE_DASH}
          </Box>
        ),
      },
    ]
  }, [data, employeesQuery.data])

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
    <div>
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
              data={vehiclesQuery.data ?? []}
              isSuccess={vehiclesQuery.isSuccess}
              sx={{ margin: 0 }}
            />
          </TabPanel>
          <TabPanel
            value={ClientTab.Tickets}
            sx={{ paddingX: 0, width: '100%' }}
          >
            <TicketsTable
              page={ticketsPage}
              count={ticketsCount}
              data={ticketsQuery.data ?? []}
              sx={{ margin: 0 }}
              isSuccess
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
    </div>
  )
}
