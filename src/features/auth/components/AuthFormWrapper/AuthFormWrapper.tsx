import { PropsWithChildren } from 'react'
import logoVertical from '@assets/logo-vertical.png'
import { theme } from '@data/theme'
import { Box } from '@mui/material'

interface AuthFormWrapperProps {}

export const AuthFormWrapper = ({ children }: PropsWithChildren<AuthFormWrapperProps>) => {
  return (
    <Box
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '24px',
        paddingBottom: '150px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={logoVertical}
          alt="СЕРВИСПРО"
          style={{ display: 'block' }}
          width={165}
          height={192}
        />
        <Box
          sx={{
            display: 'grid',
            width: '400px',
            borderRadius: 3,
            border: '1px solid',
            padding: '28px 28px 28px',
            mt: '32px',
            borderColor: theme.palette.grey['200'],
            background: theme.palette.common.white,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
