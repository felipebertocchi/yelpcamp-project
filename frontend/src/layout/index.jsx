import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

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
            <Outlet />
            <Footer links={links} />
        </>
    );
}