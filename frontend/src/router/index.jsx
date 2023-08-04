import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import pages from '../pages';
import { ErrorPage } from '../pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: pages,
        errorElement: <ErrorPage />
    },
]);

export default router;