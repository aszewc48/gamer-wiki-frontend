import axios from "axios"
import { useState } from "react"


const DeveloperEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newDeveloperName,setNewDeveloperName] = useState({developerName: ''})
    const updateDeveloperName = event => {
        setNewDeveloperName({[event.target.name]:event.target.value})
    }
    
    const handleDeveloperSubmit = (event) => {
        event.preventDefault()  
        const developerObject = {gameId: props.gameId, developerName: newDeveloperName.developerName}
        const storedToken = localStorage.getItem('authToken');
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit/create/developer-name`, developerObject, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          }) 
                .then(updatedDeveloperName => {
                    console.log(updatedDeveloperName.data)
                    props.getSingleGame(props.gameId)
                    setNewDeveloperName({
                    developerName: ''
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
                <form onSubmit={handleDeveloperSubmit}>
                    <label>Developer:</label>
                    <input name="developerName" value={newDeveloperName.developerName} onChange={updateDeveloperName} />
                    <button>Create</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default DeveloperEdit