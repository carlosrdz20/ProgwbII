import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Paginas/Login.jsx';
import Registro from './Paginas/Registro.jsx';
import Inicio from './Paginas/Inicio.jsx';
import Error from './Paginas/Error.jsx';
import MisPublicaciones from './Paginas/MisPublic.jsx';
import MisFavoritos from './Paginas/MisFavoritos.jsx';
import MisBorradores from './Paginas/MisBorradores.jsx'
import Perfil from './Paginas/Perfil.jsx';
import CrearPublicacion  from './Paginas/CrearPublicacion.jsx';
import EditarPublicacion  from './Paginas/EditarPublicacion.jsx';
import EditarBorrador from './Paginas/EditarBorrador.jsx';
import EditarPerfil from './Paginas/EditarPerfil.jsx';
import PerfilAjeno from './Paginas/PerfilAjeno.jsx';
import { UserProvider } from './Context/UserContext.js';
import AuthProvider from './Context/AuthProvider.js';
import PublicacionProvider from './Context/PubProvider.js';
import PrivateRoute from './PrivateRoute';
import Pruebas from './Paginas/Pruebas.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  }
  ,{
    path: '/Inicio',
    element: <Inicio />,
    errorElement: <Error />
  },
  {
    path: '/Registro',
    element: <Registro />,
  },
  {
    path: '/MisPublicaciones',
    element: <MisPublicaciones />,
  },
  {
    path: '/MisFavoritos',
    element: <MisFavoritos />,
  },
  {
    path: '/MisBorradores',
    element: <MisBorradores />,
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
  },
  {
    path:'/Pruebas',
    element: <Pruebas />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <AuthProvider>
    <PublicacionProvider>
    <RouterProvider router={router} />
    </PublicacionProvider>
    </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);