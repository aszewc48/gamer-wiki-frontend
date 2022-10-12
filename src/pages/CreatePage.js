import {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
    const navigate = useNavigate()
    const [state,setState] = useState({
        title: '',
        mainImage: '',
        genre: '',
        subGenre: ''
    })
    const updateState = event => setState({
        ...state,
        [event.target.name]: event.target.value
    })
    const handleSubmit = event => {
        event.preventDefault()
        // const storedToken = localStorage.getItem('authToken')
        axios.post('http://localhost:3001/create', state)
            .then(res => {
                console.log(res.data)
                navigate(`/search/${res.data.game._id}`)
            })
        .catch(err => console.log('Error creating new game data:',err))
    }

    return (
        <div className='form'>
            <h1>Create Game Page</h1>
            <form className='reg-log' onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input name='title' value={state.title} onChange={updateState}/>
                </div>
                <div>
                    <label>Image</label>
                    <input name='mainImage' value={state.mainImage} onChange={updateState}/>
                </div>
                <div>
                    <label>Genre</label>
                    <input name='genre' value={state.genre} onChange={updateState} />
                </div>
                <div>
                    <label>Sub Genre</label>
                    <input name='subGenre' value={state.subGenre} onChange={updateState} />
                </div>
                <button className='form-button'>Create</button>
            </form>
        </div>
    )
}

export default CreatePage