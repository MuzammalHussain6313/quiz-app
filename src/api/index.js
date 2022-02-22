
const base_url = '';

export const state = {
    test: '',
    quizzes: []
}

export const getQuizzes = () => {
    return state.quizzes;
    // return [{
    //     name: 'ali',
    //     url: base_url
    // }]
}

export const setQuiz = (quiz) => {
    state.quizzes.push(quiz);
    debugger
}
