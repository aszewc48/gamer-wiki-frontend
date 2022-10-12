import axios from "axios"
import { useState } from "react"


const PlatformEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [hidden2,setHidden2] = useState(true)
    const [hidden3,setHidden3] = useState(true)
    const [newRelease,setNewRelease] = useState({release: ''})
    const updateRelease = event => {
        setNewRelease({[event.target.name]:event.target.value})
    }
    
    const handleCreate = () => {
        const releaseObject = {gameId: props.gameId, release: newRelease.release}
        const storedToken = localStorage.getItem('authToken');
        axios.post(`http://localhost:3001/edit/create/release`, releaseObject, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
                .then(updatedRelease => {
                    console.log(updatedRelease.data)
                    props.getSingleGame(props.gamerId)
                    setNewRelease({
                        release: ''
                })
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreate()
    }

    const [newPlatform,setNewPlatform] = useState(props.element.platform)
    const updatePlatform = event => {
        setNewPlatform(event.target.value)
    }
    const handleUpdate = () => {
        // event.preventDefault()
        const storedToken = localStorage.getItem('authToken');
        axios.put(`http://localhost:3001/edit/update/platform/${props.element._id}`, {platform: newPlatform}, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
                .then(updatedPlatform => {
                    console.log(updatedPlatform.data)
                    props.getSingleGame(props.gamerId)
                    setNewPlatform({
                    platform: ''
                })
                    setHidden2(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }
    const handleUpdateSubmit = (event) => {
        event.preventDefault()
        handleUpdate()
    }

    const handleDelete = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.delete(`http://localhost:3001/edit/delete/platform/${props.element._id}`, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
            .then(res => {
                console.log(res)
                setHidden3(event => !event)
                props.getSingleGame(props.gamerId)
                    setNewPlatform({
                    platform: ''
                })
            })
            .catch(err => console.log('Error deleting data', err))
    }
    const deletePlatform = (event) => {
        event.preventDefault()
        handleDelete()
    }
    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#43;</button>
            <button onClick={() => setHidden2(event => !event)}>&#9874;</button>
            <button onClick={() => setHidden3(event => !event)}>&#x2715;</button>
            {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Release Date:</label>
                    <input name="release" value={newRelease.release} onChange={updateRelease} />
                    <button>Create</button>
                </form>
            </div>
            ) : null}
            {!hidden2 ? (
            <div > 
                <form onSubmit={handleUpdateSubmit}>
                    <label>Platform:</label>
                    <input name="platform" value={newPlatform.platform} onChange={updatePlatform} placeholder={props.element.platform}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
            {!hidden3 ? (
                <div>
                    <p>Delete?</p>
                    <form onSubmit={deletePlatform}>
                    <button>Yes</button>
                    </form>
                    <button onClick={() => setHidden2(event => !event)}>No</button>
                </div>
            ) : null}
        </div>
    )
}

export default PlatformEdit