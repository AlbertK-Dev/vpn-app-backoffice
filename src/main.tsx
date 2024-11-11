import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './providers/authProvider.tsx'
import VpnServerProvider from './providers/vpnServerProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <VpnServerProvider>
         <App />
      </VpnServerProvider>
     
    </AuthProvider>
    
  </StrictMode>,
)
