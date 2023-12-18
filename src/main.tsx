import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ThemeRegistry } from '@components/ThemeRegistry'
import { Box } from '@mui/material'
import { router } from '~/routes'
import './globals.css'
import 'leaflet/dist/leaflet.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeRegistry>
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
    </ThemeRegistry>
  </StrictMode>
)
