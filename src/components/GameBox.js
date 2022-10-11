import axios from 'axios'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import FilterMenu from './FilterMenu'
import SearchBar from './SearchBar'

const GameBox = () => {
    const [games,setGames] = useState([])
    const [filteredGames,setFilteredGames] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/gamebox/`)
            .then(res => {
                console.log(res.data.games)
                setGames(res.data.games)
                setFilteredGames(res.data.games)
            })
            .catch(err => console.log('Gamebox Error:', err))
    }, [])
    const searchGame = (gameArray) => {
        console.log(gameArray)
        setGames(gameArray)
      }
    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}> 
            <SearchBar searchGame={searchGame} filteredGames={filteredGames}/>
            <FilterMenu searchGame={searchGame} filteredGames={filteredGames}/>
            </div>
            {games.map(element => {
                return (
                    <div className='game-box'key={element._id}>
                        <Link to={`/search/${element._id}`}>
                        <h1>{element.title}</h1>
                        {element.mainImage ? (
                            <img src={element.mainImage} alt='game' height={200}/>
                            ) : (<div className='no-image'>No Image</div>)}
                        <p>{element.subGenre}</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default GameBox