import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ThemeRegistry } from '@components/ThemeRegistry'
import { theme } from '@data/theme'
import { Box } from '@mui/material'
import { router } from '~/routes'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './globals.css'
import 'leaflet/dist/leaflet.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeRegistry>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.grey['100'],
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </ThemeRegistry>
  </StrictMode>
)
