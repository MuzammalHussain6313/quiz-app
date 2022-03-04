
import { Navigate, Outlet } from 'react-router-dom';

import routeNames from './routNames';
// views
import Quizzes from "../components/quizzes/Quizzes";
import AttemptQuiz from "../components/quizzes/AttemptQuiz";
import MainNavigation from "../ui/MainNavigation";
import NotFound from "../components/notFound/NotFound";

const AuthLayout = () => (
    <>
        <MainNavigation/>
        <div style={{paddingTop: "80px"}}>
            <Outlet/>
        </div>
    </>
)

const UserRoutes = {
    path: '/',
    // element: ,
    element: <AuthLayout />,
    children: [
        { path: '/', element: <Navigate to={routeNames.user.quizzes} /> },
        { path: routeNames.user.quizzes, element: <Quizzes /> },
        { path: routeNames.user.attemptQuiz, element: <AttemptQuiz /> },
        { path: '/404', element: <NotFound /> },
        // { path: '*', element: <Navigate to={routeNames.user.quizzes} /> },
        { path: '*', element: <Navigate to="/404" /> },
    ]
};

export default UserRoutes;