import { useState, useContext } from "react"
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../contexts/auth.contexts"


const Login = () => {
    const{storeToken,authenticateUser,setMessage} = useContext(AuthContext)
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
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, state)
            .then(res => {
                console.log(res.data)
                storeToken(res.data.authToken)
                authenticateUser()
                navigate('/login')
                setMessage(res.data.error)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="form">
             <h2>Log In</h2>
            <form className="reg-log" onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type='email' name='email' value={state.email} onChange={updateState}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' value={state.password} onChange={updateState}/>
                </div>
                <button className="form-button">Log In!</button>
            </form>
            <p>No account?<Link style={{marginLeft: '5%'}} to='/signup' onClick={() => setMessage('')}>Register</Link></p>
        </div>
    )
}

export default Login