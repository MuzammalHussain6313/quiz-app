import {SET_QUIZ, SET_USER} from "../actions/actionTypes";

const initialState = {
    quizzes: [],
};

export default function (state= initialState, action) {
    switch (action.type) {
        case SET_QUIZ:
            return { ...state, quizzes: action.payload };

        case SET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

