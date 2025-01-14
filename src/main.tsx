import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthProvider } from './auth/AuthContext.tsx'
import { UserProvider } from './users/userProvider.tsx'
//import AuthProvider from './auth/AuthProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
          <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
