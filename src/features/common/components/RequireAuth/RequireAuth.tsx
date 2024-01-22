import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

export const RequireAuth = () => {
  const location = useLocation()
  const { auth } = useAuth()

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate
      to={'/auth'}
      state={{ from: location }}
      replace
    />
  )
}
