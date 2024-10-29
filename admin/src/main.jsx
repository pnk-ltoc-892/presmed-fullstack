import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import AdminContextProvider from './context/AdminContext.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppContextProvider>
            <DoctorContextProvider>
                <AdminContextProvider>
                    <App />
                </AdminContextProvider>
            </DoctorContextProvider>
        </AppContextProvider>
    </BrowserRouter>
)
