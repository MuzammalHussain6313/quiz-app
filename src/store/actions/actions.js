
// import store from '../store';
import {SET_QUIZ} from "./actionTypes";

export const setQuizList = (list) => (dispatch) => {

    // let newdata = [{jhghg: 'ytyi7gti'}]
    // list.map((item) => {
    //     debugger
    //     newdata.push(item)
    // })

    // const state = store.getState().quizReducer
    // let data = state.quizzes;
    // let newdata = []
    //
    // data.map((item) => {
    //     newdata.push({ item })
    // })

    dispatch({
        type: SET_QUIZ,
        payload: list,
    });
    return list;
};
