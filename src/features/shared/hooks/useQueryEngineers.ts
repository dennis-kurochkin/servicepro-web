import { QueryKey } from '@features/shared/data'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { useQuery } from '@tanstack/react-query'

export const useQueryEngineers = () => {
  const { api } = useApi()
  const { organizationID } = useOrganizationID()

  return useQuery({
    queryKey: [QueryKey.Engineers, organizationID],
    queryFn: async ()=> {
      const { data } = await api.workSersEmployeesList({
        orgId: organizationID.toString(),
        role: 'engineer',
      })
      return data ?? []
    },
    refetchOnWindowFocus: false,
  })

}
