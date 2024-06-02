import { TableHeader } from '@components/TableHeader'
import { QueryKey } from '@features/shared/data'
import { VehiclesTable } from '@features/vehicles/components/VehiclesTable'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { useQuery } from '@tanstack/react-query'

export const VehiclesRoute = () => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  const { data, isSuccess } = useQuery({
    queryKey: [QueryKey.Vehicles, organizationID],
    queryFn: async () => {
      const { data } = await api.workSersVehiclesList({
        orgId: organizationID.toString(),
      })

      return data
    },
  })

  return (
    <>
      <TableHeader
        sx={{ marginTop: '8px' }}
      >
        Техника
      </TableHeader>
      <VehiclesTable
        data={data ?? []}
        isSuccess={isSuccess}
      />
    </>
  )
}
