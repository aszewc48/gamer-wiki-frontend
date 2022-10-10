import axios from "axios"
import { useState } from "react"
import { useParams} from "react-router-dom"

const ProducerEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newProducerName,setNewProducerName] = useState({producerName: ''})
    const updateProducerName = event => {
        setNewProducerName({[event.target.name]:event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()  
        const producerObject = {gameId: props.gameId, producerName: newProducerName.producerName}
        axios.post(`http://localhost:3001/edit/create/producer-name`, producerObject)
                .then(updatedProducerName => {
                    console.log(updatedProducerName.data)
                    props.getSingleGame(props.gameId)
                    setNewProducerName({
                    producerName: ''
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
                    <label>Producer:</label>
                    <input name="producerName" value={newProducerName.producerName} onChange={updateProducerName} />
                    <button>Create</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default ProducerEdit