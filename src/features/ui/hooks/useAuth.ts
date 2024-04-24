import { useContext } from 'react'
import { AuthContext } from '@features/ui/contexts/AuthProvider'

export const useAuth = () => {
  return useContext(AuthContext)
}
