import { useState } from 'react'
import { useQuery } from 'react-query'
import { useApi } from '@hooks/useApi'
import { useAuth } from '@hooks/useAuth'
import { useOrganizationIDNullable } from '@hooks/useOrganizationIDNullable'
import { MyEmployment, MyUserAll } from '~/api/servicepro.generated'

export const useProfile = (onSuccess?: (data: MyUserAll) => void) => {
  const { api } = useApi()
  const { auth } = useAuth()
  const { organizationID } = useOrganizationIDNullable()
  const [employment, setEmployment] = useState<MyEmployment | null>(null)

  const query = useQuery(['my', auth?.user, auth?.accessToken], async () => {
    const { data } = await api.orgMyRetrieve()
    return data ?? {}
  }, {
    enabled: !!auth?.accessToken,
    onSuccess: (data) => {
      if (organizationID && !employment) {
        setEmployment(data.employments.find(({ organization: { id } }) => id === organizationID) ?? null)
      }

      onSuccess?.(data)
    },
  })

  return {
    query,
    employment,
    setEmployment,
  }
}
