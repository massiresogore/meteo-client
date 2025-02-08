import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthProvider } from './auth/AuthContext.tsx'
import { UserProvider } from './users/userProvider.tsx'
import {QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


//import AuthProvider from './auth/AuthProvider.tsx'
const qureryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={qureryClient}>
    <AuthProvider>
      <UserProvider>
          <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
    <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
)
