import axios from "axios"
import { useState } from "react"
import { useParams} from "react-router-dom"

const GenreEdit = (props) => {
    const {gameId} = useParams()
    const [hidden,setHidden] = useState(true)
    const [newGenre,setNewGenre] = useState(props.game.genre)
    const updateGenre = event => {
        setNewGenre(event.target.value)
    }
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/genre/${gameId}`, {genre: newGenre})
                .then(updatedGenre => {
                    console.log(updatedGenre.data)
                    props.getSingleGame(props.gameId)
                    setNewGenre({
                    genre: ''
                })
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }
    const handleSubmit = event => {
        event.preventDefault()
        putData()
    }
    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#9874;</button>
            <button onClick={() => setHidden(event => !event)}>&#x2715;</button>
            {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Genre:</label>
                    <input name="genre" value={newGenre.genre} onChange={updateGenre} placeholder={props.game.genre}/>
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default GenreEdit