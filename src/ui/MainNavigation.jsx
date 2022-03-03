
import {NavLink} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {setLogin, setQuizList} from "../store/actions/actions";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";

class MainNavigation extends Component {

    constructor(props) {
        super(props);
    }

    logout() {
        if (window.confirm('Are you sure you want to logout?')) {
            this.props.setLogin(false);
            localStorage.setItem('isLoggedIn', null);
            window.open('/', '_self');
            // document.getElementById("logout").click();
        } else {
            // Do nothing!
        }
    }

    render() {
        return (
            <header className={classes.header}>
                {/*<div className={classes.logo}>Online Quizzes</div>*/}
                <NavLink to='/' className={classes.logo}>Quiz App</NavLink>
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
