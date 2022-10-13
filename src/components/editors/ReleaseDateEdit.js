import axios from "axios"
import { useState } from "react"


const ReleaseDateEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newPlatform,setNewPlatform] = useState({platform: ''})
    const updatePlatform = event => {
        setNewPlatform({[event.target.name]:event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()  
        const platformObject = {gameId: props.gameId, platform: newPlatform.platform}
        const storedToken = localStorage.getItem('authToken');
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit/create/platform`, platformObject, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
                .then(updatedPlatform => {
                    console.log(updatedPlatform.data)
                    props.getSingleGame(props.gameId)
                    setNewPlatform({
                    platfrom: ''
                })
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }
    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#43;</button>
            {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Platform:</label>
                    <input name="platform" value={newPlatform.platform} onChange={updatePlatform} />
                    <button>Create</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default ReleaseDateEdit