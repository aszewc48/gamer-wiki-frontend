import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage'
import {Routes,Route,Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <NavBar />
      <hr></hr>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/game-page' element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
