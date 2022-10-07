import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import {Routes,Route,Link} from 'react-router-dom'
import SingleGame from './pages/singleGame';

function App() {
  return (
    <div className="App">
      <NavBar />
      <hr></hr>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:gameId' element={<SingleGame />} />
      </Routes>
    </div>
  );
}

export default App;
