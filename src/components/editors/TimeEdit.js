import axios from "axios"
import { useState } from "react"

const TimeEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [hidden2,setHidden2] = useState(true)
    const [newRelease,setNewRelease] = useState(props.element.release)
    const updateRelease = event => {
        setNewRelease(event.target.value)
    }
    const putData = () => {  
        const storedToken = localStorage.getItem('authToken');
        axios.put(`http://localhost:3001/edit/update/release/${props.element._id}`, {release: newRelease}, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
                .then(updatedRelease => {
                    console.log(updatedRelease.data)
                    props.getSingleGame(props.gameId)
                    setNewRelease({
                    release: ''
                })
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }
    const handleSubmit = event => {
        event.preventDefault()
        putData()
    }

    const handleDelete = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.delete(`http://localhost:3001/edit/delete/release/${props.element._id}`, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
            .then(res => {
                console.log(res)
                setHidden2(event => !event)
                props.getSingleGame(props.gameId)
                    setNewRelease({
                    release: ''
                })
            })
            .catch(err => console.log('Error deleting data', err))
    }
    const deleteRelease = (event) => {
        event.preventDefault()
        handleDelete()
    }
    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#9874;</button>
            <button onClick={() => setHidden2(event => !event)}>&#x2715;</button>
            {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Release Date:</label>
                    <input name="release" value={newRelease.release} onChange={updateRelease} placeholder={props.element.release}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
            {!hidden2 ? (
                <div>
                    <p>Delete?</p>
                    <form onSubmit={deleteRelease}>
                    <button>Yes</button>
                    </form>
                    <button onClick={() => setHidden2(event => !event)}>No</button>
                </div>
            ) : null}
        </div>
    )
}

export default TimeEdit