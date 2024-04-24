import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useRefreshToken } from '@hooks/useRefreshToken'
import { AxiosError } from 'axios'
import { privateClient } from '~/api'

export const useApi = () => {
  const { auth, setAuth } = useAuth()
  const { refreshToken } = useRefreshToken()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const requestInterceptor = privateClient.instance.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    const responseInterceptor = privateClient.instance.interceptors.response.use(
      response => response,
      async (error: AxiosError<null, { sent?: boolean }>) => {
        const prevRequest = error?.config

        if (error?.response?.status === 401 && prevRequest && !prevRequest.data?.sent) {
          prevRequest.data = { sent: true }

          try {
            const newAccessToken = await refreshToken()
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

            setAuth({
              ...auth,
              accessToken: newAccessToken,
            })

            return privateClient.instance(prevRequest)
          } catch (error) {
            navigate('/auth', { state: { from: location }, replace: true })
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      }
    )

    return () => {
      privateClient.instance.interceptors.request.eject(requestInterceptor)
      privateClient.instance.interceptors.response.eject(responseInterceptor)
    }
  }, [auth, refreshToken, location, navigate, setAuth])

  return {
    api: privateClient.api,
    instance: privateClient.instance,
  }
}
