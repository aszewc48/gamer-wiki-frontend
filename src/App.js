import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import {Routes,Route,Link} from 'react-router-dom'
import SingleGame from './pages/singleGame';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage'
import Login from './pages/Login';
import Register from './pages/Register';
import IsAnon from './components/isAnon';
import IsPrivate from './components/isPrivate';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <hr></hr>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:gameId' element={<SingleGame />} />
        <Route path='/create' element={<IsPrivate><CreatePage /></IsPrivate>} />
        <Route path='/game/edit/:gameId' element={<IsPrivate><EditPage /></IsPrivate>} />
        <Route path='/login' element={<IsAnon><Login /></IsAnon>} />
        <Route path='/signup' element={<IsAnon><Register /></IsAnon>} />
        <Route path='/profile' element={<IsPrivate><ProfilePage /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
