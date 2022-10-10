import axios from "axios"
import { useState } from "react"

const DeveloperNameEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newDeveloperName,setNewDeveloperName] = useState(props.element.developerName)
    const updateDeveloperName = event => {
        setNewDeveloperName(event.target.value)
    }
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/developer-name/${props.element._id}`, {developerName: newDeveloperName})
                .then(updatedDeveloperName => {
                    console.log(updatedDeveloperName.data)
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }
    const handleSubmit = event => {
        // event.preventDefault()
        putData()
    }
    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#9874;</button>
            <button onClick={() => setHidden(event => !event)}>&#x2715;</button>
            {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Developer Name:</label>
                    <input name="developerName" value={newDeveloperName} onChange={updateDeveloperName} placeholder={props.element.developerName}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default DeveloperNameEdit