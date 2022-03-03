import {SET_LOGIN, SET_QUIZ, SET_USER} from "../actions/actionTypes";

const initialState = {
    quizzes: [],
    isLoggedIn: false
};

export default function (state= initialState, action) {
    switch (action.type) {
        case SET_QUIZ:
            return { ...state, quizzes: action.payload };

        case SET_USER:
            return { ...state, user: action.payload };

        case SET_LOGIN:
            return { ...state, isLoggedIn: action.payload };
        default:
            return state;
    }
}

