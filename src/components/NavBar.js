import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../contexts/auth.contexts'

const NavBar = () => {
    const {isLoggedIn,logOutUser} = useContext(AuthContext)
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link className='title-link' to='/'><h1 className='title'>Gamer-Wiki</h1></Link>
            <div className='nav-right'>
            <Link to='/search'><h4>Search</h4></Link>
            {isLoggedIn && (
                <>
                    <Link to='/create'><h4>Create</h4></Link>
                    <Link to='/profile'><h4>Profile</h4></Link>
                    <button className='logout-button' to='/logout' onClick={() => logOutUser()}><h3>Log Out</h3></button>
                </>
            )}
            {!isLoggedIn && (
                <>
                    <Link to='/login'><h4>Log In</h4></Link>
                    <Link to='/signup'><h4>Register</h4></Link>
                </>
            )}
            </div>
        </div>
    )
}

export default NavBar