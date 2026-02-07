import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { ServiceContext, ServiceProvider } from '../context/ServiceContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ServiceProvider>
                    <App />
                </ServiceProvider>     
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
     
   
    
)
