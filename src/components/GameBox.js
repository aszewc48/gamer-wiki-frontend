import axios from 'axios'
import {useState,useEffect} from 'react'

const GameBox = () => {
    const [game,setGame] = useState('')
    useEffect(() => {
        axios.get(`http://localhost:3001/gamebox/`)
            .then(res => setGame(res.games))
            .catch(err => console.log('Gamebox Error:', err))
    }, [])
    return (
        <div>
            {game.map(element => {
                return (
                <h1>{element.title}</h1>
                )
            })}
        </div>
    )
}

export default GameBox