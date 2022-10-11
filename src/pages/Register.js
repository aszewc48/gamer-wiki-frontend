import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        username: '',
        password: ''
    })
    const updateState = event => setState({
        ...state,
        [event.target.name]: event.target.value
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/auth/signup', state)
            .then(res => {
                console.log(res.data)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
             <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
            <div>
                    <label>Username</label>
                    <input type='email' name='email' value={state.email} onChange={updateState}/>
                </div>
                <div>
                    <label>Username</label>
                    <input name='username' value={state.username} onChange={updateState}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={state.password} onChange={updateState}/>
                </div>
                <button>Sign Up!</button>
            </form>
        </div>
    )
}

export default Register