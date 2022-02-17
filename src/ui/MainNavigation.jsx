import {NavLink} from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            {/*<div className={classes.logo}>Online Quizzes</div>*/}
            <NavLink to='/' className={classes.logo}>Online Quizzes
            </NavLink>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to='/quizzes'>
                            Quizzes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add-quiz'>
                            Add a Quiz
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
