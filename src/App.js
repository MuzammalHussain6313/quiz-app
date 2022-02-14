
import './App.css';
import {Routes, Route} from 'react-router-dom'

import Quizzes from './components/quizzes/Quizzes'
import MainNavigation from './ui/MainNavigation';
import NotFound from './components/notFound/NotFound';
import AttemptQuiz from './components/quizzes/AttemptQuiz';
import AddQuiz from './components/quizzes/AddQuiz';

const App = () => {

  return (
    <div className="App">
        <MainNavigation />
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

export default App;
