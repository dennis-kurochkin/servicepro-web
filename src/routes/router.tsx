import { createBrowserRouter, redirect } from 'react-router-dom'
import { LayoutAuth } from '@components/LayoutAuth'
import { LayoutHeader } from '@components/LayoutHeader'
import { LayoutHeaderContained } from '@components/LayoutHeaderContained'
import { LayoutMain } from '@components/LayoutMain'
import { AuthRoute } from '@routes/auth'
import { EngineersRoute } from '@routes/engineers/engineers'
import { Root } from '@routes/root'
import { TicketsRoute } from '@routes/tickets/tickets'
import { VehiclesRoute } from '@routes/vehicles/vehicles'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: async () => {
      return redirect('/auth')
    },
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
        ],
      },
    ],
  },
])
