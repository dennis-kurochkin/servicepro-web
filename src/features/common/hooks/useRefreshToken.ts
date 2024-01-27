import { AuthContextData } from '@features/common/contexts/AuthProvider'
import { rr } from '@features/common/types'
import { useAuth } from '@hooks/useAuth'
import { publicClient } from '~/api'

export const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const { data } = await rr(publicClient.api.accountJwtRefreshCookieCreate)({}, { withCredentials: true })

    setAuth((prev: AuthContextData) => ({
      ...prev,
      accessToken: data.access,
    }))

    return data.access
  }

  return { refreshToken: refresh }
}
