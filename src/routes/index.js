
import { Navigate, useRoutes } from 'react-router-dom';

// routes
import AuthRoutes from './authRoutes';
import UserRoutes from './userRoutes';

const Router = () => {

    // Local State
    const token = JSON.parse(localStorage.getItem('isLoggedIn'));
    const mainRoutes =  token ? UserRoutes : AuthRoutes;

    // return
    return useRoutes([
        mainRoutes,
        { path: '*', element: <Navigate to='/404' /> },
    ]);
};

export default Router;