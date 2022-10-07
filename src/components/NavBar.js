import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link className='title-link' to='/'><h1 className='title'>Gamer-Wiki</h1></Link>
            <div className='nav-right'>
            <Link to='/search'><h4>Search</h4></Link>
            <Link to='/create'><h4>Create</h4></Link>
            <Link to='/profile'><h4>Profile</h4></Link>
            </div>
        </div>
    )
}

export default NavBar