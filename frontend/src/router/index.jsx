import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout links={[
            {
                "link": "/about",
                "label": "About"
            },
            {
                "link": "/campgrounds",
                "label": "Campgrounds"
            },
            {
                "link": "/Login",
                "label": "Login"
            },
            {
                "link": "/register",
                "label": "Sign up"
            },
        ]} />,
        children: [
            // ...
        ],
    },
]);

export default router;