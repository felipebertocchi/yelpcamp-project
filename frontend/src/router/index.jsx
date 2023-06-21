import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import pages from '../pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: pages,
    },
]);

export default router;