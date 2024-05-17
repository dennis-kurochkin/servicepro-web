import { useApi } from '@hooks/useApi'
import { useAuth } from '@hooks/useAuth'
import { useOrganizationIDNullable } from '@hooks/useOrganizationIDNullable'
import { useQuery } from '@tanstack/react-query'

export const useEmployment = () => {
  const { api } = useApi()
  const { auth } = useAuth()
  const { organizationID } = useOrganizationIDNullable()

  return useQuery({
    queryKey: ['my', auth?.user, auth?.accessToken],
    queryFn: async () => {
      const { data } = await api.orgMyRetrieve()
      return data.employments.find(({ organization: { id } }) => id === organizationID) ?? null
    },
    enabled: !!auth?.accessToken,
  })
}
