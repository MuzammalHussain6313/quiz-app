import firebase from 'firebase';
import axios from "axios";

const firebaseConfig = {
    apiKey: "AIzaSyDqPTasNWHF68AJ-zMQIqh-VfAhCV-mSck",
    authDomain: "quiz-app-ff47d.firebaseapp.com",
    databaseURL: "https://quiz-app-ff47d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quiz-app-ff47d",
    storageBucket: "quiz-app-ff47d.appspot.com",
    messagingSenderId: "177889404933",
    appId: "1:177889404933:web:f61799e2230660dbbb146c",
    measurementId: "G-HCDR6F6RE9"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;

const base_url = '';

export const state = {
    test: '',
    quizzes: []
}

export const addQuiz = async (quiz) => {
    var key = firebase.database().ref('quizzes').push().key;
    console.log(key);
    await firebase.database().ref(`quizzes/${key}`).set(quiz).then(res => {
        console.log('data pushed');
    });
}

export const getQuizzes = () => {
    return state.quizzes;
}

export const getNews = async () => {
    var response = await axios.get('https://api.publicapis.org/entries');
    return response.data;
}
