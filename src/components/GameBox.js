import axios from 'axios'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import FilterMenu from './FilterMenu'
import SearchBar from './SearchBar'

const GameBox = () => {
    const [games,setGames] = useState([])
    const [filteredGames,setFilteredGames] = useState([])
    const [gamesObject,setGamesObject] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3001/gamebox/`)
            .then(res => {
                console.log(res.data.games)
                setGames(res.data.games)
                setFilteredGames(res.data.games)
                setGamesObject(res.data.games[0])
            })
            .catch(err => console.log('Gamebox Error:', err))
    }, [])
    const searchGame = (gameArray) => {
        console.log('GAME ARRAY:', gameArray)
        setGames(gameArray)
      }
    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}> 
            <SearchBar searchGame={searchGame} filteredGames={filteredGames}/>
            <FilterMenu searchGame={searchGame} filteredGames={filteredGames} gamesObject={gamesObject}/>
            </div>
            {games.map(element => {
                return (
                    <div className='game-box'key={element._id}>
                        <Link to={`/search/${element._id}`}>
                        {element.title.length > 40 ? (
                            <h1 style={{fontSize: '1em'}}>{element.title}</h1>
                        ) : element.title.length > 15 ? (
                            <h1 style={{fontSize: '1em',paddingTop: '10%',paddingBottom: '10%'}}>{element.title}</h1>
                        ) : <h1>{element.title}</h1>} 
                        {element.mainImage ? (
                            <img className='img-hover' src={element.mainImage} alt='game' height={200} width={200}/>
                            ) : (<div className='no-image'>No Image</div>)}
                        <p>{element.genre}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default GameBox