import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import {Routes,Route,Link} from 'react-router-dom'
import SingleGame from './pages/singleGame';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage'

function App() {
  return (
    <div className="App">
      <NavBar />
      <hr></hr>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:gameId' element={<SingleGame />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/game/edit/:gameId' element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
