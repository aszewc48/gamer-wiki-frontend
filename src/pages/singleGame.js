import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import ImageEnlarge from '../components/ImageEnlarge'


const SingleGame = () => {
    const {gameId} = useParams()
    const [game,setGame] = useState('')
    useEffect(() => {getSingleGame(gameId)}, [gameId])
    const getSingleGame = (gameId) => {
        axios.get(`http://localhost:3001/game/${gameId}`)
            .then(res => {
                console.log(res.data.foundGameData)
                setGame(res.data.foundGameData)
            })
            .catch(err => console.log('Error retrieving single game data', err))
        }
    // console.log(game[0].releaseDate)
    return (
        <div>
            {game ? (
            <div>
            <div className='single-panel'>
            <h1>{game.title}</h1>
            <ImageEnlarge game={game}/>
            <div className='single-info-section'>
            <p>Genre: {' ' + game.genre}</p>
            <p>Sub Genre: {' ' + game.subGenre}</p>
            </div>
            <div className='single-info-section'>
            {game.producer[0] && <p><b>Producer(s)</b></p>}
            {game.producer.map(element => <p key={element._id}>{element.producerName}</p>)}
            </div>
            <div className='single-info-section'>
            {game.developer[0] && <p><b>Developers(s)</b></p>}
            {game.developer.map(element => <p key={element._id}>{element.developerName}</p>)}
            </div>
            {game.releaseDate[0] && <p><b>Platforms</b></p>}
            {game.releaseDate.map(element => {
                return(
                    <div className='single-info-section' key={element._id}>
                        <p><b>{element.platform}</b></p>
                        {element.time.map(element => {
                            return <p key={element._id}>{element.release}</p>
                        })}
                    </div>
                )
            })}
            {game.images[0] && <p><b>Images</b></p>}
            {game.images.map(element => <a key={element._id} href={element.url}><img src={element.url} alt='game' height={150}/></a>)}
            </div>
            {game.content.map(element => {
                return (
                    <div key={element._id}>
                        <h2>{element.header}</h2>
                        <p>{element.description}</p>
                    </div>
                )
            })}
            <button type='submit' className='edit-button'><Link to={`/game/edit/${game._id}`}>Edit Page</Link></button>
            </div>
            )
            : (<p>Loading...</p>)}
        </div>
    )
}

export default SingleGame