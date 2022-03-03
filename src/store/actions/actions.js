
import {SET_LOGIN, SET_QUIZ} from "./actionTypes";

export const setQuizList = (list) => (dispatch) => {
    dispatch({
        type: SET_QUIZ,
        payload: list,
    });
    return list;
};

export const setLogin = (isLogin) => (dispatch) => {
    dispatch({
        type: SET_LOGIN,
        payload: isLogin,
    });
    return isLogin;
};
