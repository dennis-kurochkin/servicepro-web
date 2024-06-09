import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { LayoutAuth } from '@components/LayoutAuth'
import { LayoutHeader } from '@components/LayoutHeader'
import { LayoutHeaderContained } from '@components/LayoutHeaderContained'
import { LayoutMain } from '@components/LayoutMain'
import { PersistentLogin } from '@components/PersistentLogin'
import { RequireAuth } from '@components/RequireAuth/RequireAuth'
import { NotFoundRoute } from '@routes/404'
import { AuthRoute } from '@routes/auth'
import { ClientRoute } from '@routes/clients/client'
import { ClientsRoute } from '@routes/clients/clients'
import { EngineersRoute } from '@routes/engineers/engineers'
import { OrganizationRoute } from '@routes/organization'
import { TicketsRoute } from '@routes/tickets/tickets'
import { VehicleRoute } from '@routes/vehicles/vehicle'
import { VehiclesRoute } from '@routes/vehicles/vehicles'

export const getConfiguredRoutes = (routes: RouteObject[]): RouteObject[] => ([
  {
    path: '/',
    element: <Navigate to={'/organization'} />,
  },
  {
    element: <PersistentLogin />,
    children: [
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
        children: routes,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundRoute />,
  },
])

export const router = createBrowserRouter(getConfiguredRoutes([
  {
    element: <OrganizationRoute />,
    path: '/organization',
  },
  {
    path: '/:organizationID',
    children: [
      {
        element: <LayoutMain />,
        children: [
          {
            element: <LayoutHeader />,
            children: [
              {
                path: 'tickets/:ticketID?',
                element: <TicketsRoute />,
              },
            ],
          },
          {
            element: <LayoutHeaderContained />,
            children: [
              {
                path: 'vehicles',
                element: <VehiclesRoute />,
              },
              {
                path: 'vehicles/:vehicleID',
                element: <VehicleRoute />,
              },
              {
                path: 'engineers',
                element: <EngineersRoute />,
              },
              {
                path: 'clients',
                element: <ClientsRoute />,
              },
              {
                path: 'clients/:clientID',
                element: <ClientRoute />,
              },
            ],
          },
        ],
      },
      {
        path: '',
        element: <NotFoundRoute />,
      },
    ],
  },
]))
