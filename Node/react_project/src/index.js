import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Paginas/Login.jsx';
import Registro from './Paginas/Registro.jsx';
import Inicio from './Paginas/Inicio.jsx';
import Error from './Paginas/Error.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />,
    errorElement: <Error />
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Registro',
    element: <Registro />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);