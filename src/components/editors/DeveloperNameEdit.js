import axios from "axios"
import { useState } from "react"

const DeveloperNameEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [hidden2,setHidden2] = useState(true)
    const [newDeveloperName,setNewDeveloperName] = useState(props.element.developerName)
    const updateDeveloperName = event => {
        setNewDeveloperName(event.target.value)
    }
    const putData = () => {  
        const storedToken = localStorage.getItem('authToken');
        axios.put(`http://localhost:3001/edit/update/developer-name/${props.element._id}`, {developerName: newDeveloperName}, {
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
    const handleSubmit = event => {
        event.preventDefault()
        putData()
    }

   
    const deleteDeveloperName = (event) => {
        event.preventDefault()
        const storedToken = localStorage.getItem('authToken');
        axios.delete(`http://localhost:3001/edit/delete/developer-name/${props.element._id}`, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
            .then(res => {
                console.log(res)
                setHidden2(event => !event)
                props.getSingleGame(props.gameId)
                    setNewDeveloperName({
                    developerName: ''
                })
            })
            .catch(err => console.log('Error deleting data', err))
    }
    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#9874;</button>
            <button onClick={() => setHidden2(event => !event)}>&#x2715;</button>
            {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Developer Name:</label>
                    <input name="developerName" value={newDeveloperName.developerName} onChange={updateDeveloperName} placeholder={props.element.developerName}/>
                    <button>Update</button>
                </form>
            </div>
            ) : null}
            {!hidden2 ? (
                <div>
                    <p>Delete?</p>
                    <form onSubmit={deleteDeveloperName}>
                    <button>Yes</button>
                    </form>
                    <button onClick={() => setHidden2(event => !event)}>No</button>
                </div>
            ) : null}
        </div>
    )
}

export default DeveloperNameEdit