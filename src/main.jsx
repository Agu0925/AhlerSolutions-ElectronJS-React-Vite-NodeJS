import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { HashRouter, Routes, Route} from 'react-router-dom'
import {App} from './App'
import {Auth} from './Components'
import { Login, Signup } from './Pages'
//Rutas
// <Route path='/' element={<> <Auth /> <App /> </> } />
export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<> <Auth /> <App /> </> } />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<Signup />} />
        <Route path='*' element={<div><h2 className='text-danger text-center'>Error: Direccion no Encontrada</h2></div>} />
      </Routes>
    </HashRouter>
  )
};
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
