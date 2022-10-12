import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../contexts/auth.contexts'

const NavBar = () => {
    const {isLoggedIn,logOutUser,setMessage} = useContext(AuthContext)
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link className='title-link' to='/' onClick={() => setMessage('')}><h1 className='title'>Gamer-Wiki</h1></Link>
            <div className='nav-right'>
            <Link to='/search' onClick={() => setMessage('')}><h4>Search</h4></Link>
            {isLoggedIn && (
                <>
                    <Link to='/create'><h4>Create</h4></Link>
                    <button className='logout-button' to='/logout' onClick={() => logOutUser()}><h3>Log Out</h3></button>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <Link to='/login' onClick={() => setMessage('')}><h4>Log In</h4></Link>
                    <Link to='/signup' onClick={() => setMessage('')}><h4>Register</h4></Link>
                </>
            )}
            </div>
        </div>
    )
}

export default NavBar