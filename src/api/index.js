
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

// const database = firebase.database();
// export default database;
// You can use above database object by importing as
// import database from '../../api';
// database.ref('path/of/your/collection').push().key;
// database.ref('path/of/your/collection').set(anyObject);

export const state = {
    test: '',
    quizzes: []
}

export const signUp = async (user) => {
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then( async res => {
        // console.log("user in api call", state);
        // var key = await firebase.database().ref('users').push().key;
        await firebase.database().ref(`users/${res.user.uid}`).set(user).then(res => {
            console.log('data pushed');
        });
        const auth = firebase.auth().currentUser;
        await auth.sendEmailVerification().then(() => {
            alert('We send you a verification email. Please check your email and verify!');
        });
    }).catch(err => {
        console.log(err);
    });
}

export const login = async (user) => {
    var uid = '';
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(res => {
        console.log('logged in user res: ', res);
        if (res.user.emailVerified) {
            uid = res.user.uid;
            // this.saveUser(res.user.uid);
        } else {
            alert('Please verify your email first.');
        }
        return uid;
    }).catch(error => {
        alert(error.message);
    });
    return uid;
}

export const saveUser = async (id) => {
    await firebase.database().ref(`users/${id}`).once('value', snapshot => {
        localStorage.setItem('user', JSON.stringify(snapshot.val()));
    }).catch(e => {
        console.log('error occured...', e);
    });
}

export const addQuiz = async (quiz) => {
    var key = firebase.database().ref('quizzes').push().key;
    await firebase.database().ref(`quizzes/${key}`).set(quiz).then(res => {
        console.log('data pushed');
    });
}

export const getQuizzes = async () => {
    var quizzes = [];
    await firebase.database().ref('quizzes').once('value', snapshot => {
        snapshot.forEach((node) => {
            const quiz = node.val();
            quizzes.push(quiz);
        });
    }).then(res => {
    }).catch(err => {
        console.log(err);
    });
    return quizzes;
}

export const addAttemptedQuizzes = async (markedQuiz) => {
    const key = await firebase.database().ref('/attemptQuizzes').push().key;
    markedQuiz.key = key;
    await firebase.database().ref(`/attemptQuizzes/${key}`).set(markedQuiz)
    .then(res => {}).catch(err => console.log(err));
    return "success";
}

export const getNews = async () => {
    var response = await axios.get('https://api.publicapis.org/entries');
    return response.data;
}

export const generateKey = (ref) => {
    return firebase.database().ref(ref).push().key;
}
