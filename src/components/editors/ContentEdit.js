import axios from "axios"
import { useState } from "react"


const ContentEdit = (props) => {
    const [hidden,setHidden] = useState(true)
    const [state,setState] = useState({
        header: '',
        description: ''
    })
    const updateState = event => {
        setState({
            ...state,
            [event.target.name]:event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()  
        const contentObject = {
            ...state,
            gameId: props.gameId
        }
        const storedToken = localStorage.getItem('authToken');
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit/create/content`, contentObject, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
                .then(updatedcontent => {
                    console.log(updatedcontent.data)
                    props.getSingleGame(props.gameId)
                    setState({
                    header: '',
                    description: ''
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
                    <label>Header:</label>
                    <input name="header" value={state.header} onChange={updateState} />
                    <textarea className="text-area" name="description" value={state.description} onChange={updateState} />
                    <button>Create</button>
                </form>
            </div>
            ) : null}
        </div>
    )
}

export default ContentEdit