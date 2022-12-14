import axios from "axios"
import { useState } from "react"

const UrlEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [newUrl,setNewUrl] = useState(props.element.url)
    // const updateUrl = event => {
    //     setNewUrl(event.target.value)
    // }
    // const putData = () => {  
    //     axios.put(`http://localhost:3001/edit/update/url/${props.element._id}`, {url: newUrl})
    //             .then(updatedUrl => {
    //                 console.log(updatedUrl.data)
    //                 props.getSingleGame(props.gameId)
    //                 setNewUrl({
    //                 url: ''
    //             })
    //                 setHidden(event => !event)
    //             })
    //         .catch(err => console.log('Error updating genre:', err))
    // }
    // const handleSubmit = event => {
    //     event.preventDefault()
    //     putData()
    // }

    const handleDelete = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/edit/delete/url/${props.element._id}`, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
            .then(res => {
                console.log(res)
                setHidden(event => !event)
                props.getSingleGame(props.gameId)
                    setNewUrl({
                    url: ''
                })
            })
            .catch(err => console.log('Error deleting data', err))
    }
    const deleteUrl = (event) => {
        event.preventDefault()
        handleDelete()
    }
    return (
        <div>
            <button onClick={() => setHidden(event => !event)}>&#x2715;</button>
            {/* {!hidden ? (
            <div >
                <form onSubmit={handleSubmit}>
                    <label>Genre:</label>
                    <input name="url" value={newUrl.url} onChange={updateUrl} placeholder={props.element.url}  />
                    <button>Update</button>
                </form>
            </div>
            ) : null} */}
            {!hidden ? (
                <div>
                    <p>Delete?</p>
                    <form onSubmit={deleteUrl}>
                    <button>Yes</button>
                    </form>
                    <button onClick={() => setHidden(event => !event)}>No</button>
                </div>
            ) : null}
        </div>
    )
}

export default UrlEdit