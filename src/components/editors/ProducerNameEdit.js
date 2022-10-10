import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

const ProducerNameEdit = (props) => {
    const {gameId} = useParams()
    const [hidden,setHidden] = useState(true)
    const [hidden2,setHidden2] = useState(true)
    const [newProducerName,setNewProducerName] = useState(props.element.producerName)
    const updateProducerName = event => {
        setNewProducerName(event.target.value)
    }
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/producer-name/${props.element._id}`, {producerName: newProducerName})
                .then(updatedProducerName => {
                    console.log(updatedProducerName.data)
                    setHidden(event => !event)
                })
            .catch(err => console.log('Error updating genre:', err))
    }
    const handleSubmit = event => {
        // event.preventDefault()
        putData()
    }
    const deleteProducerName = (event) => {
        event.preventDefault()
        axios.delete(`http://localhost:3001/edit/delete/producer-name/${props.element._id}`)
            .then(res => {
                console.log(res)
                setHidden2(event => !event)
                props.getSingleGame(props.gameId)
                    setNewProducerName({
                    producerName: ''
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
                    <label>Producer Name:</label>
                    <input name="producerName" value={newProducerName} onChange={updateProducerName} placeholder={props.element.producerName}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
            {!hidden2 ? (
                <div>
                    <p>Delete?</p>
                    <form onSubmit={deleteProducerName}>
                    <button>Yes</button>
                    </form>
                    <button onClick={() => setHidden2(event => !event)}>No</button>
                </div>
            ) : null}
        </div>
    )
}

export default ProducerNameEdit