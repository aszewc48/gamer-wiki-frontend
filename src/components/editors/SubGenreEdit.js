import axios from "axios"
import { useState } from "react"
import { useParams} from "react-router-dom"

const SubGenreEdit = (props) => {
    const {gameId} = useParams()
    const [hidden,setHidden] = useState(true)
    const [newSubGenre,setNewSubGenre] = useState(props.game.subGenre)
    const updateSubGenre = event => {
        setNewSubGenre(event.target.value)
    }
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/sub-genre/${gameId}`, {subGenre: newSubGenre}, {new: true})
                .then(updatedSubGenre => {
                    console.log(updatedSubGenre.data)
                    props.getSingleGame(props.gameId)
                    setNewSubGenre({
                    subGenre: ''
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
                    <label>Sub Genre:</label>
                    <input name="subGenre" value={newSubGenre.subGenre} onChange={updateSubGenre} placeholder={props.game.subGenre}/>
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default SubGenreEdit