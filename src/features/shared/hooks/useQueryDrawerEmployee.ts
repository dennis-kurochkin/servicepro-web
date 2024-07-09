import { getEngineerLabel } from '@features/engineers/helpers'
import { QueryKey } from '@features/shared/data'
import { EmployeeProfile } from '@features/shared/types'
import { useApi } from '@hooks/useApi'
import { useOrganizationID } from '@hooks/useOrganizationID'
import { useQuery } from '@tanstack/react-query'
import { RoleEnum } from '~/api/servicepro.generated'

export const useQueryDrawerEmployee = (id: number | null) => {
  const { organizationID } = useOrganizationID()
  const { api } = useApi()

  return useQuery({
    queryKey: [QueryKey.Employee, typeof id === 'number' ? id : -1],
    queryFn: async (): Promise<EmployeeProfile> => {
      if (typeof id !== 'number') {
        return {
          id: -1,
          name: 'Система',
          role: RoleEnum.Server,
        }
      }

      const { data } = await api.workSersEmployeesRetrieve(id, organizationID.toString())

      return {
        id: data.id,
        name: getEngineerLabel(data.profile),
        role: data.role,
        photo: data.profile.photo ?? undefined,
      }
    },
    enabled: typeof id === 'number',
    staleTime: 60000,
  })
}
