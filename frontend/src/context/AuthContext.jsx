import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) =>{
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userInfo, setUserInfo] = useState(()=>{
        const storedUserInfo = localStorage.getItem('userInfo');
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    });

    const login = (token, userInfo) =>{
        setToken(token);
        setUserInfo(userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setToken(null);
        setUserInfo(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    }

    return(
        <AuthContext.Provider value={{token, userInfo, setUserInfo, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
