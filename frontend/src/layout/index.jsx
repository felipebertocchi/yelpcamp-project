import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Flex } from '@mantine/core';

export default function () {
    const links = [
        {
            "link": "/about",
            "label": "About"
        },
        {
            "link": "/campgrounds",
            "label": "Campgrounds"
        },
        {
            "link": "/login",
            "label": "Login"
        },
        {
            "link": "/register",
            "label": "Sign up"
        },
    ]

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header links={links} />
            <div><Outlet /></div>
            <Footer links={links} />
        </div>
    );
}