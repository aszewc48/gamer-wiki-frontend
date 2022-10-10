import axios from "axios"
import { useState } from "react"

const UrlEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newUrl,setNewUrl] = useState(props.element.url)
    const updateUrl = event => {
        setNewUrl(event.target.value)
    }
    const putData = () => {  
        axios.put(`http://localhost:3001/edit/update/url/${props.element._id}`, {url: newUrl})
                .then(updatedUrl => {
                    console.log(updatedUrl.data)
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
            <button onClick={() => setHidden(event => !event)}>&#x2715;</button>
            {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Genre:</label>
                    <input name="url" value={newUrl} onChange={updateUrl} placeholder={props.element.url}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default UrlEdit