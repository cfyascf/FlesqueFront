import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './contexts/user.context'
import routes from './routes/main.routes'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={routes}/>
    </UserProvider>
  </StrictMode>,
)
