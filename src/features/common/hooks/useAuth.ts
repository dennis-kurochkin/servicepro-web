import { useContext } from 'react'
import { AuthContext } from '@features/common/contexts/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext)
}
