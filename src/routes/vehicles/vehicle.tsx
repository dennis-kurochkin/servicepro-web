import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FieldLabelValue } from '@components/FieldLabelValue'
import { PageEntityHeader } from '@components/PageEntityHeader'
import { EMPTY_VALUE_DASH, PAGINATION_DEFAULT_LIMIT } from '@constants/index'
import { PanelInfo } from '@features/shared/components/PanelInfo'
import { QueryKey } from '@features/shared/data'
import { LabelValue } from '@features/shared/types'
import { TicketsTable } from '@features/tickets/components/TicketsTable'
import { VehicleRecommendationsChips } from '@features/vehicles/components/VehicleRecommendationsChips'
import { VehicleTabRecommendations } from '@features/vehicles/components/VehicleTabRecommendations'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

enum VehicleTab {
  Recommendations = 'recommendations',
  Tickets = 'tickets',
  Documents = 'documents',
  Notes = 'notes',
  OperatingTime = 'operating-time',
}

const VehicleTabLabel: Record<VehicleTab, string> = {
  [VehicleTab.Recommendations]: 'Рекоммендации',
  [VehicleTab.Tickets]: 'Заявки',
  [VehicleTab.Documents]: 'Документация',
  [VehicleTab.Notes]: 'Заметки',
  [VehicleTab.OperatingTime]: 'Наработка',
}

export const VehicleRoute = () => {
  const params = useParams()
  const { api } = useApi()
  const { organizationID } = useOrganizationID()
  const vehicleID = useMemo(() => +(params.vehicleID || '-1'), [params])
  const [tab, setTab] = useState(VehicleTab.Recommendations)
  const [ticketsCount, setTicketsCount] = useState(0)
  const [ticketsPage, setTicketsPage] = useState(0)

  const { data, isFetching } = useQuery({
    queryKey: [QueryKey.Vehicle, vehicleID, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersVehiclesRetrieve(vehicleID, organizationID.toString())
      return data
    },
  })

  const info = useMemo((): LabelValue[] => {
    return [
      {
        label: 'Вид техники',
        value: data?.model.name_prefix ?? EMPTY_VALUE_DASH,
      },
      {
        label: 'Бренд',
        value:  data?.model.brand.name || EMPTY_VALUE_DASH,
      },
      {
        label: 'Модель',
        value: data?.model.name || EMPTY_VALUE_DASH,
      },
      {
        label: 'Серийный номер',
        value: data?.sn ? `SN ${data?.sn}` : EMPTY_VALUE_DASH,
      },
      {
        label: 'Год выпуска',
        value: data?.manufacture_date?.toString() ?? EMPTY_VALUE_DASH,
      },
      {
        label: 'Наработка',
        value: data?.summary?.runtime_sum ? `${data?.summary.runtime_sum}мч` : EMPTY_VALUE_DASH,
      },
    ]
  }, [data])

  const ticketsQuery = useQuery({
    queryKey: [QueryKey.ClientTickets, ticketsPage, organizationID],
    queryFn: async () => {
      const options = {
        orgId: organizationID.toString(),
        offset: ticketsPage * PAGINATION_DEFAULT_LIMIT,
        limit: PAGINATION_DEFAULT_LIMIT,
      }

      const { data, headers } = await api.workSersTasksVerboseList(options)

      setTicketsCount(headers['x-count'] ? +headers['x-count'] : 0)

      return data ?? []
    },
    refetchOnWindowFocus: false,
  })

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
          title={'Данные по технике'}
          isFetching={false}
        />
        <Box
          sx={{
            position: 'relative',
            marginTop: '24px',
          }}
        >
          <PanelInfo
            info={info}
            isFetching={isFetching}
            icon={data?.model.equipment?.icon ?? ''}
          />
          {data?.summary && (
            <Box
              sx={{
                position: 'absolute',
                left: 'calc(100% - 32px)',
                bottom: 'calc(100% - 32px)',
                padding: '8px',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: (theme) => theme.palette.grey['300'],
                background: (theme) => theme.palette.common.white,
              }}
            >
              <VehicleRecommendationsChips
                count={{
                  warning: data.summary.r_warning_count ?? 0,
                  critical: data.summary.r_critical_count ?? 0,
                  info: data.summary.r_info_count ?? 0,
                }}
              />
            </Box>
          )}
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
              {Object.values(VehicleTab).map((value) => (
                <Tab
                  key={value}
                  label={VehicleTabLabel[value]}
                  value={value}
                />
              ))}
            </TabList>
          </Box>
          <TabPanel
            value={VehicleTab.Recommendations}
            sx={{ paddingX: 0, width: '100%' }}
          >
            <VehicleTabRecommendations vehicleID={vehicleID} />
          </TabPanel>
          <TabPanel
            value={VehicleTab.Tickets}
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
            value={VehicleTab.Documents}
            sx={{ paddingX: 0 }}
          >

          </TabPanel>
          <TabPanel
            value={VehicleTab.Notes}
            sx={{ paddingX: 0 }}
          >

          </TabPanel>
          <TabPanel
            value={VehicleTab.OperatingTime}
            sx={{ paddingX: 0 }}
          >
            <FieldLabelValue
              label={'Наработка'}
              value={data?.summary?.runtime_sum ? `${data?.summary.runtime_sum}мч` : EMPTY_VALUE_DASH}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
