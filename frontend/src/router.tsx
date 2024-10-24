import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import ProtectedRoute from './protectedRoute';

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/register',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          element: <ProtectedRoute component={(await import('@/pages/dashboard')).default} />,
        }),
      },
      {
        path: 'tasks',
        lazy: async () => ({
          element: <ProtectedRoute component={(await import('@/pages/tasks')).default} />,

        }),
      },
      {
        path: 'tasks/new',
        lazy: async () => ({
          element: <ProtectedRoute component={(await import('@/pages/tasks/new-tasks')).default} />,
        }),
      },
      {
        path: 'tasks/edit/:id',
        lazy: async () => ({
          element: <ProtectedRoute component={(await import('@/pages/tasks/edit-tasks')).default} />,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          element: <ProtectedRoute component={(await import('@/components/coming-soon')).default} />,
        }),
      },
    ],
  },
  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
