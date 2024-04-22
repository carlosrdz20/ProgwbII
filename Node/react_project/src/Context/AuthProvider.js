import React, { useEffect,createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props){
    const [user, setUser] = useState(localStorage.getItem('user'));
    console.log("Valor del contexto en AuthProvider:", user);
    useEffect(() => {
        // Recuperar los datos de autenticación del almacenamiento local al cargar la aplicación
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setUser(userData);
        }
      }, []);

    const isLogged = () => {
        return !!user;
    };

    const login = (usuarioInfo, token) =>{
        console.log("Datos Login: ", usuarioInfo, token);

        setUser(usuarioInfo);

        localStorage.setItem('user', JSON.stringify(usuarioInfo));
        localStorage.setItem('token', token);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('publicacion');
        setUser(null);
    }

    const contextValue = {
        user, isLogged, login, logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
