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
import database, {writeUserData} from "./api/index";

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setQuizzes();
        // console.log('db: ', database);
        // writeUserData('5676576', 'muzammil', 'hmuzammal015@gmail.com', 'ghytf');
    }

    async setQuizzes() {
        var quizzes = [];
        quizzes = JSON.parse(localStorage.getItem('quizzes'));
        if(quizzes.length> 0) await this.props.setQuizzes(quizzes);
    }

    render() {
        return (
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
        quizzes: state.quizReducer.quizzes
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setQuizzes: (list) => setQuizList(list),
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
