import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <div className='home-page'>
            <Link to='/search'>Search</Link>
            <div></div>
            <Link to='/login'>Login</Link>
            <p>Welcome to Gamer Wiki. Here you can search a variety of different genres of video games with multiple categories.
            You can create your own pages, and edit others as well.</p>
        </div>
    )
}

export default HomePage