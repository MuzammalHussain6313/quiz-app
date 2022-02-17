
import {createStore} from 'redux';

const quizReducer = (state = {
    quizzes: []
}, action) => {
    if(action.type === 'add-quiz'){
        state.quizzes.push(action.quiz);
        return state.quizzes;
    }
}

const store = createStore(quizReducer);

export default store
