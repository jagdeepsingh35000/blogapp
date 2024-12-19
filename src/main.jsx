import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from '../Context/UserContext.jsx'
import { BlogContextProvider } from '../Context/BlogContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <UserContextProvider> 
  <BlogContextProvider>
  
    <App />
    <ToastContainer />
  
  </BlogContextProvider>

  </UserContextProvider>
  </BrowserRouter>
)
