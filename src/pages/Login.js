import { useState, useContext } from "react"
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../contexts/auth.contexts"


const Login = () => {
    const{storeToken,authenticateUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const updateState = event => setState({
        ...state,
        [event.target.name]: event.target.value
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/auth/login', state)
            .then(res => {
                console.log(res.data)
                storeToken(res.data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
             <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type='email' name='email' value={state.email} onChange={updateState}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' value={state.password} onChange={updateState}/>
                </div>
                <button>Log In!</button>
            </form>
            <p>No account?<Link to='/signup'>Register</Link></p>
        </div>
    )
}

export default Login