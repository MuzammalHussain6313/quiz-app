
import {NavLink} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {setLogin} from "../store/actions/actions";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";

class MainNavigation extends Component {

    componentDidMount() {
        this.user = JSON.parse(localStorage.getItem("user"));
    }

    //
    logout() {
        if (window.confirm('Are you sure you want to logout?')) {
            this.props.setLogin(false);
            localStorage.clear();
            // window.open('/', '_self');
        } else {
            // Do nothing!
        }
    }

    render() {
        return (
            <header className={classes.header}>
                <NavLink to='/' className={classes.logo}>Quiz App</NavLink>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink to='/quizzes'>
                                Quizzes
                            </NavLink>
                        </li>
                        { this.user?.role === 'teacher' && <li>
                            <NavLink to='/add-quiz'>
                                Add a Quiz
                            </NavLink>
                        </li>}
                        <li>
                            <Button onClick={(event) => this.logout()}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </nav>
                <a id={"logout"} href={"/"}/>
            </header>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.quizReducer.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setLogin: (isLogin) => setLogin(isLogin),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
