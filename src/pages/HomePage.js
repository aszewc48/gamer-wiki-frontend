import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.contexts'

const HomePage = () => {
    const {isLoggedIn} = useContext(AuthContext)
    return (
        <div className='home-page'>
            <Link to='/search'>Search</Link>
            <div></div>
            {!isLoggedIn && (
            <Link to='/login'>Login</Link>
            )}
            {isLoggedIn && (
                <Link to='/profile'>Profile</Link>
            )}
            <p>Welcome to Gamer Wiki. Here you can search a variety of different genres of video games with multiple categories.
            You can create your own pages, and edit others as well.</p>
        </div>
    )
}

export default HomePage