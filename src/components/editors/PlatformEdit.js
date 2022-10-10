import axios from "axios"
import { useState } from "react"


const PlatformEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [hidden2,setHidden2] = useState(true)
    const [newRelease,setNewRelease] = useState({release: ''})
    const updateRelease = event => {
        setNewRelease({[event.target.name]:event.target.value})
    }
    
    const handleSubmit = (event) => {
        // event.preventDefault()  
        const releaseObject = {gameId: props.gameId, release: newRelease.release}
        axios.post(`http://localhost:3001/edit/create/release`, releaseObject)
                .then(updatedRelease => {
                    console.log(updatedRelease.data)
                    props.getSingleGame(props.gameId)
                    console.log('Game ID:',props.gameId)
                    setNewRelease({
                        release: ''
                })
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }

    const [newPlatform,setNewPlatform] = useState(props.element.platform)
    const updatePlatform = event => {
        setNewPlatform(event.target.value)
    }
    const handleUpdateSubmit = event => {
        axios.put(`http://localhost:3001/edit/update/platform/${props.element._id}`, {platform: newPlatform})
                .then(updatedPlatform => {
                    console.log(updatedPlatform.data)
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }

    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#43;</button>
            <button onClick={() => setHidden2(event => !event)}>&#9874;</button>
            <button onClick={() => setHidden(event => !event)}>&#x2715;</button>
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
                    <input name="developerName" value={newPlatform} onChange={updatePlatform} placeholder={props.element.platform}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default PlatformEdit