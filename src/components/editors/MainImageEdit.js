import axios from "axios"
import { useState } from "react"
import { useParams} from "react-router-dom"

const MainImageEdit = (props) => {
    const {gameId} = useParams()
    const [hidden,setHidden] = useState(true)
    const [newMainImage,setNewMainImage] = useState(props.game.mainImage)
    const updateMainImage = event => {
        setNewMainImage(event.target.value)
    }
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/main-image/${gameId}`, {mainImage: newMainImage}, {new: true})
                .then(updatedMainImage => {
                    console.log(updatedMainImage.data)
                    props.getSingleGame(props.gameId)
                    setNewMainImage({
                    mainImage: ''
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
                    <input name="mainImage" value={newMainImage.mainImage} onChange={updateMainImage} placeholder={props.game.mainImage}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default MainImageEdit