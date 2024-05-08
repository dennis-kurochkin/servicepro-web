import { useState } from 'react'
import { useApi } from '@hooks/useApi'
import { useAuth } from '@hooks/useAuth'
import { useOrganizationIDNullable } from '@hooks/useOrganizationIDNullable'
import { useQuery } from '@tanstack/react-query'
import { MyEmployment, MyUserAll } from '~/api/servicepro.generated'

export const useProfile = (onSuccess?: (data: MyUserAll) => void) => {
  const { api } = useApi()
  const { auth } = useAuth()
  const { organizationID } = useOrganizationIDNullable()
  const [employment, setEmployment] = useState<MyEmployment | null>(null)

  const query = useQuery({
    queryKey: ['my', auth?.user, auth?.accessToken],
    queryFn: async () => {
      const { data } = await api.orgMyRetrieve()

      if (organizationID && !employment) {
        setEmployment(data.employments.find(({ organization: { id } }) => id === organizationID) ?? null)
      }

      onSuccess?.(data)

      return data ?? {}
    },
    enabled: !!auth?.accessToken,
  })

  return {
    query,
    employment,
    setEmployment,
  }
}
