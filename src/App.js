import './App.css';
import {Routes, Route} from 'react-router-dom'

import Quizzes from './components/quizzes/Quizzes'
import MainNavigation from './ui/MainNavigation';
import NotFound from './components/notFound/NotFound';
import AttemptQuiz from './components/quizzes/AttemptQuiz';
import AddQuiz from './components/quizzes/AddQuiz';
import {Component} from "react";
import classes from './App.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setQuizList} from "./store/actions/actions";
import {getQuizzes} from "./api/index";
import Login from "./authentication/login/login";
import SignUp from "./authentication/signup/signup";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            path: '',
        }
    }

    componentDidMount() {
        const params = window.location.pathname;
        var path = params.slice(params.lastIndexOf('/')+1);
        this.setPath(path);
        this.checkUser();
    }

    async setPath(path) {
        await this.setState((prevSate, state) => ({
            path: path
        }));
    }

    checkUser(){
        let user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            this.setLoggedIn(true);
            this.setQuizzes();
        } else {
            this.setLoggedIn(false);
        }
    }

    async setLoggedIn(value){
        await this.setState((prevSate, state) => ({
            isLoggedIn: value
        }));
    }

    async setQuizzes() {
        var quizzes = await getQuizzes();
        // quizzes = JSON.parse(localStorage.getItem('quizzes'));
        if(quizzes.length> 0) await this.props.setQuizzes(quizzes);
    }

    render() {
        return (!this.state.isLoggedIn && this.state.path === 'login') ? (<Login/>) : (!this.state.isLoggedIn && this.state.path === 'sign-up') ? (<SignUp/>) : (
            <div className="App">
                <MainNavigation/>
                <Routes>
                    <Route path='/' element={<Quizzes/>}>
                    </Route>
                    <Route path='/quizzes' element={<Quizzes/>}>
                    </Route>
                    <Route path='/quizzes/:quizId' element={<AttemptQuiz/>}>
                    </Route>
                    <Route path='/add-quiz' element={<AddQuiz/>}>
                    </Route>
                    <Route path='*' element={<NotFound/>}>
                    </Route>
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setQuizzes: (list) => setQuizList(list),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
