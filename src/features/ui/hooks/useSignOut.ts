import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { publicClient } from '~/api'

export const useSignOut = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const signOut = async () => {
    try {
      await publicClient.api.accountJwtBlacklistCookieCreate({ withCredentials: true })
    } catch (error) {
      //
    } finally {
      setAuth({})
      navigate('/auth', { state: { from: location } })
    }
  }

  return { signOut }
}
