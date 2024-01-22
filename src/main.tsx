import { StrictMode } from 'react'
import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ThemeRegistry } from '@components/ThemeRegistry'
import { AuthProvider } from '@features/common/contexts/AuthProvider'
import { Box } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { queryClient } from '~/api'
import { router } from '~/routes'
import './globals.css'
import 'leaflet/dist/leaflet.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeRegistry>
          <SnackbarProvider maxSnack={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#E6E6E6',
              }}
            >
              <RouterProvider router={router} />
            </Box>
          </SnackbarProvider>
        </ThemeRegistry>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
