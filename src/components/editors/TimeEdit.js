import axios from "axios"
import { useState } from "react"

const TimeEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newRelease,setNewRelease] = useState(props.element.release)
    const updateRelease = event => {
        setNewRelease(event.target.value)
    }
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/release/${props.element._id}`, {release: newRelease})
                .then(updatedRelease => {
                    console.log(updatedRelease.data)
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
                    <label>Release Date:</label>
                    <input name="release" value={newRelease} onChange={updateRelease} placeholder={props.element.release}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default TimeEdit