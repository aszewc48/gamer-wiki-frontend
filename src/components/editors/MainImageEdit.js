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
        const storedToken = localStorage.getItem('authToken');  
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit/update/main-image/${gameId}`, {mainImage: newMainImage}, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
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