
import './App.css';
import {Routes, Route} from 'react-router-dom'

import Quizzes from './components/quizzes/Quizzes'
import MainNavigation from './ui/MainNavigation';
import NotFound from './components/notFound/NotFound';
import AttemptQuiz from './components/quizzes/AttemptQuiz';
import AddQuiz from './components/quizzes/AddQuiz';
import {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setLogin, setQuizList} from "./store/actions/actions";
import Login from "./authentication/login/login";
import SignUp from "./authentication/signup/signup";

class App extends Component {

    componentDidMount() {
        this.checkUser();
    }

    checkUser(){
        let isLogin = JSON.parse(localStorage.getItem('isLoggedIn'));
        if(isLogin) {
            this.props.setLogin(true);
        } else {
            this.props.setLogin(false);
        }
        setTimeout(() => {
            console.log(this.props.isLoggedIn);
        }, 500);
    }

    async setLoggedIn(value){
        await this.setState((prevSate, state) => ({
            isLoggedIn: value
        }));
    }

    render() {
        return (
            <div className="App">
                { this.props.isLoggedIn && <MainNavigation/>}
                <Routes>
                    { !this.props.isLoggedIn && <Route path='/' element={<Login/>}>
                    </Route>}
                    {<Route path='/signup' element={<SignUp/>}>
                    </Route>}
                    { this.props.isLoggedIn && <Route path='/' element={<Quizzes/>}>
                    </Route>}
                    { this.props.isLoggedIn && <Route path='/quizzes' element={<Quizzes/>}>
                    </Route>}
                    { this.props.isLoggedIn && <Route path='/quizzes/:quizId' element={<AttemptQuiz/>}>
                    </Route>}
                    { this.props.isLoggedIn && <Route path='/add-quiz' element={<AddQuiz/>}>
                    </Route>}
                    <Route path='*' element={<NotFound/>}>
                    </Route>
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.quizReducer.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setQuizzes: (list) => setQuizList(list),
        setLogin: (isLogin) => setLogin(isLogin),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
