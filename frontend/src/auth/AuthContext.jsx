import React, { createContext, useState, useEffect } from 'react';
import { decodeJWT } from '../utils/decodeJWT';
import { notifications } from '@mantine/notifications';
import { IconInfoSmall } from '@tabler/icons-react';
import { Anchor } from '@mantine/core';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            const userData = decodeJWT(token);
            if (new Date((userData.exp * 1000)) < new Date()) {
                notifications.show({
                    title: 'Session expired',
                    message: <>Your session has expired. Please <Anchor href="/login">log in</Anchor> again</>,
                    withBorder: true,
                    icon: <IconInfoSmall />,
                });
                localStorage.removeItem('user');
            } else {
                setUser(userData);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
