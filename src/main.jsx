import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from '././Context/AuthContext'
ReactDOM.createRoot(document.getElementById('root')).render(

<ChakraProvider>
 <BrowserRouter>
   <AuthContextProvider>
    <App />
</AuthContextProvider>
 </BrowserRouter> 
</ChakraProvider> 
)
