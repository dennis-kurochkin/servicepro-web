import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useRefreshToken } from '@hooks/useRefreshToken'
import { Box, CircularProgress } from '@mui/material'

export const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { refreshToken } = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refreshToken()
      } catch (error) {
        console.warn(error)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
        >
          <CircularProgress color={'secondary'} />
        </Box>
      ) : <Outlet />}
    </>
  )
}
