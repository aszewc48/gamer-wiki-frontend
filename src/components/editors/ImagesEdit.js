import axios from "axios"
import { useState } from "react"


const ImagesEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newUrl,setNewUrl] = useState({url: ''})
    const updateUrl = event => {
        setNewUrl({[event.target.name]:event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()  
        const urlObject = {gameId: props.gameId, url: newUrl.url}
        const storedToken = localStorage.getItem('authToken');
        axios.post(`http://localhost:3001/edit/create/url`, urlObject, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
                .then(updatedUrl => {
                    console.log(updatedUrl.data)
                    props.getSingleGame(props.gameId)
                    setNewUrl({
                    url: ''
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
                    <label>Image Url:</label>
                    <input name="url" value={newUrl.url} onChange={updateUrl} />
                    <button>Create</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default ImagesEdit