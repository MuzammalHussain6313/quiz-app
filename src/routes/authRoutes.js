import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// components
// import Loadable from '../components/Loadable/Loadable';
// layouts
// routes
import routeNames from './routNames';
// views
import Login from "../authentication/login/login";
import SignUp from "../authentication/signup/signup";
// const Page404 = Loadable(lazy(() => import('../views/Page404')));
// const Page401 = Loadable(lazy(() => import('../views/Page401')));
// const Page500 = Loadable(lazy(() => import('../views/Page500')));



const AuthRoutes = {
    path: '/',
    // element: ,
    // element: <AuthLayout />,
    children: [
        { path: '/', element: <Navigate to={routeNames.general.login} /> },
        { path: routeNames.general.login, element: <Login /> },
        { path: routeNames.general.signup, element: <SignUp /> },
        // { path: '/404', element: <Page404 /> },
        // { path: '/401', element: <Page401 /> },
        // { path: '/500', element: <Page500 /> },
        { path: '*', element: <Navigate to={routeNames.general.login} /> },
    ]
};

export default AuthRoutes;




