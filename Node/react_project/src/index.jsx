import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Paginas/Login.jsx';
import Registro from './Paginas/Registro.jsx';
import Inicio from './Paginas/Inicio.jsx';
import Error from './Paginas/Error.jsx';
import Perfil from './Paginas/Perfil.jsx';
import CrearPublicacion  from './Paginas/CrearPublicacion.jsx';
import EditarPublicacion  from './Paginas/EditarPublicacion.jsx';
import EditarBorrador from './Paginas/EditarBorrador.jsx';
import EditarPerfil from './Paginas/EditarPerfil.jsx';
import PerfilAjeno from './Paginas/PerfilAjeno.jsx';

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
  },
  {
    path:'/Perfil',
    element: <Perfil />,
  },
  {
    path:'/CrearPublicacion',
    element: <CrearPublicacion />,
  },
  {
    path:'/EditarPublicacion',
    element: <EditarPublicacion />,
  },
  {
    path:'/EditarBorrador',
    element: <EditarBorrador />,
  },
  {
    path:'/EditarPerfil',
    element: <EditarPerfil />,
  },
  {
    path:'/PerfilAjeno',
    element: <PerfilAjeno />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);