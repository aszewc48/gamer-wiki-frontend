import { useEffect, useState, useContext } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../contexts/auth.contexts"

const Register = () => {
    const navigate = useNavigate()
    const { setIsLoading, setMessage } = useContext(AuthContext)
    const [checker,setChecker] = useState([])
    const [state, setState] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const updateState = event => setState({
        ...state,
        [event.target.name]: event.target.value
    })
    const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (state.username.length < 4) {
      setMessage("username must be at least four characters");
      setIsLoading(false);
      return;
    } 
    if (!regexExp.test(state.email)) {
      setMessage("that is not a valid email address");
      setIsLoading(false);
      return;
    } 
    if (state.password.length < 6) {
      setMessage("password must be at least 6 characters");
      setIsLoading(false);
      return;
    } 
    if (state.password !== state.confirmPassword) {
      setMessage("your password didn't match");
      setIsLoading(false);
      return;
    } 
        axios.post('http://localhost:3001/auth/signup', state)
            .then(res => {
                console.log(res.data)
                navigate('/login')
                setIsLoading(false)
                setMessage('')
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get('http://localhost:3001/check/check')
            .then(res => {
                setChecker(res.data.user)
            })
    }, [])
    return (
        <div className="form">
             <h2>Sign Up</h2>
            <form className="reg-log" onSubmit={handleSubmit}>
            <div>
                    <label>Email</label>
                    <input type='email' name='email' value={state.email} onChange={updateState}/>
                    {checker.some(ele => ele.email === state.email) &&
                    <div>
                    <p className="form-message">Email already in use</p>
                    </div>
                    } 
                </div>
                <div>
                    <label>Username</label>
                    <input name='username' value={state.username} onChange={updateState}/>
                    {checker.some(ele => ele.username === state.username) &&
                    <div>
                    <p className="form-message">Username already in use</p>
                    </div>
                    } 
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='confirmPassword' value={state.confirmPassword} onChange={updateState}/>
                </div>
                <div>
                    <label> Confirm Password</label>
                    <input type='password' name='password' value={state.password} onChange={updateState}/>
                    {state.confirmPassword !== state.password && <p className="form-message">Passwords must match</p>}
                </div>
                <button className="form-button">Sign Up!</button>
            </form>
        </div>
    )
}

export default Register