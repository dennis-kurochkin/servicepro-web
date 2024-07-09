import { QueryKey } from '@features/shared/data'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { useQuery } from '@tanstack/react-query'
import { Profile } from '~/api/servicepro.generated'

export const useQueryEmployee = (id: number | null) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  return useQuery({
    queryKey: [QueryKey.Employee, typeof id === 'number' ? id : -1],
    queryFn: async (): Promise<Profile> => {
      const { data } = await api.workSersEmployeesRetrieve(id!, organizationID.toString())

      return data.profile
    },
    enabled: !!id,
    staleTime: 60000,
  })
}
