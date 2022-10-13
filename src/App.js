import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import {Routes,Route,Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './contexts/auth.contexts';
import SingleGame from './pages/singleGame';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage'
import Login from './pages/Login';
import Register from './pages/Register';
import IsAnon from './components/isAnon';
import IsPrivate from './components/isPrivate';

function App() {
  const {message, isLoading} = useContext(AuthContext)
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
      </Routes>
      {message && <p className='message'>{message}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
