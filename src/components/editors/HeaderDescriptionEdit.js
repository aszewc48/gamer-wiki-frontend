import axios from "axios"
import { useState } from "react"

const HeaderDescriptionEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newHeader,setNewHeader] = useState(props.element.header)
    const [newDescription,setNewDescription] = useState(props.element.description)
    const updateHeader = event => setNewHeader(event.target.value)
    const updateDescription = event => setNewDescription(event.target.value)
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/content/${props.element._id}`, {
            header: newHeader,
            description: newDescription
        })
                .then(updatedContent => {
                    console.log(updatedContent.data)
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
                    <label>Header:</label>
                    <input name="header" value={newHeader} onChange={updateHeader} placeholder={props.element.header}  />
                    <textarea className="text-area" name="description" value={newDescription} onChange={updateDescription} placeholder={props.element.description} />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default HeaderDescriptionEdit