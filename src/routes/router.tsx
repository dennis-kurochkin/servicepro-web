import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LayoutAuth } from '@components/LayoutAuth'
import { LayoutHeader } from '@components/LayoutHeader'
import { LayoutHeaderContained } from '@components/LayoutHeaderContained'
import { LayoutMain } from '@components/LayoutMain'
import { RequireAuth } from '@components/RequireAuth/RequireAuth'
import { AuthRoute } from '@routes/auth'
import { ClientsRoute } from '@routes/clients/clients'
import { EngineersRoute } from '@routes/engineers/engineers'
import { TicketsRoute } from '@routes/tickets/tickets'
import { VehiclesRoute } from '@routes/vehicles/vehicles'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/tickets'} />,
  },
  {
    element: <LayoutAuth />,
    children: [
      {
        path: '/auth',
        element: <AuthRoute />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <LayoutMain />,
        children: [
          {
            element: <LayoutHeader />,
            children: [
              {
                path: '/tickets',
                element: <TicketsRoute />,
              },
            ],
          },
          {
            element: <LayoutHeaderContained />,
            children: [
              {
                path: '/vehicles',
                element: <VehiclesRoute />,
              },
              {
                path: '/engineers',
                element: <EngineersRoute />,
              },
              {
                path: '/clients',
                element: <ClientsRoute />,
              },
            ],
          },
        ],
      },
    ],
  },
])
