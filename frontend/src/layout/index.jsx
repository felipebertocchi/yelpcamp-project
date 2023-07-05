import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from '@mantine/core';

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
        <>
            <Header links={links} />
            <Container size={"xl"}>
                <Outlet />
            </Container>
            <Footer links={links} />
        </>
    );
}