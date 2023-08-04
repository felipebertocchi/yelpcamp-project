import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isUserLoggedIn = async () => {
            await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/user`)
                .then(response => {
                    if (response.data.verified) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                    }
                })
                .catch(error => {
                    console.error('Error checking user auth:', error);
                });
        };
        isUserLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
