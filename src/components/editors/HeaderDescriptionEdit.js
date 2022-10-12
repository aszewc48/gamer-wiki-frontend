import axios from "axios"
import { useState } from "react"

const HeaderDescriptionEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [hidden2,setHidden2] = useState(true)
    const [newHeader,setNewHeader] = useState(props.element.header)
    const [newDescription,setNewDescription] = useState(props.element.description)
    const updateHeader = event => setNewHeader(event.target.value)
    const updateDescription = event => setNewDescription(event.target.value)
    const putData = () => {
        const storedToken = localStorage.getItem('authToken');  
        axios.put(`http://localhost:3001/edit/update/content/${props.element._id}`, {
            header: newHeader,
            description: newDescription
        })
                .then(updatedContent => {
                    console.log(updatedContent.data)
                    props.getSingleGame(props.gameId)
                    setNewHeader({
                        header: ''
                    })
                    setNewDescription({
                        description: ''
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
        axios.delete(`http://localhost:3001/edit/delete/content/${props.element._id}`, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
            .then(res => {
                console.log(res)
                setHidden(event => !event)
                props.getSingleGame(props.gameId)
                setNewHeader({
                    header: ''
                })
                setNewDescription({
                    description: ''
                })
            })
            .catch(err => console.log('Error deleting data', err))
    }
    const deleteContent = (event) => {
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
                    <label>Header:</label>
                    <input name="header" value={newHeader.header} onChange={updateHeader} placeholder={props.element.header}  />
                    <textarea className="text-area" name="description" value={newDescription.description} onChange={updateDescription} placeholder={props.element.description} />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
            {!hidden2 ? (
                <div>
                    <p>Delete?</p>
                    <form onSubmit={deleteContent}>
                    <button>Yes</button>
                    </form>
                    <button onClick={() => setHidden(event => !event)}>No</button>
                </div>
            ) : null}
        </div>
    )
}

export default HeaderDescriptionEdit