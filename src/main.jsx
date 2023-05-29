import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {App} from './App'
import {Auth} from './Components'
import { Login, Signup } from './Pages'
//Rutas
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<> <Auth /> <App /> </> } />
        <Route exact path='Login' element={<Login />} />
        <Route exact path='SignUp' element={<Signup />} />
        <Route path='*' element={<div><h2 className='text-danger text-center'>Error: Direccion no Encontrada</h2></div>} />
      </Routes>
    </BrowserRouter>
  )
};
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
