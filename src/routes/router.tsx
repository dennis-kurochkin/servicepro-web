import { createBrowserRouter, redirect } from 'react-router-dom'
import { LayoutAuth } from '@components/LayoutAuth'
import { LayoutHeader } from '@components/LayoutHeader'
import { AuthRoute } from '@routes/auth'
import { Root } from '@routes/root'
import { TicketsRoute } from '@routes/tickets'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: async () => {
      return redirect('/auth')
    },
  },
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
    element: <LayoutAuth />,
    children: [
      {
        path: '/auth',
        element: <AuthRoute />,
      },
    ],
  },
])
