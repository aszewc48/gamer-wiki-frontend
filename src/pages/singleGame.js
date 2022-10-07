import axios from 'axios'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

const SingleGame = () => {
    const {gameId} = useParams()
    const [game,setGame] = useState('')
    useEffect(() => {
        axios.get(`http://localhost:3001/game/${gameId}`)
            .then(res => {
                console.log(res.data.foundGameData)
                setGame(res.data.foundGameData)
            })
            .catch(err => console.log('Error retrieving single game data', err))
    }, [gameId])
    // console.log(game[0].releaseDate)
    return (
        <div>
            {game ? (
            <div>
            <div className='single-panel'>
            <h1>{game.title}</h1>
            <a href={game.mainImage}><img src={game.mainImage} alt='game' height={200} /></a>
            <div className='single-info-section'>
            <p>Genre: {' ' + game.genre}</p>
            <p>Sub Genre: {' ' + game.subGenre}</p>
            </div>
            <div className='single-info-section'>
            <p ><b>Producer(s)</b></p>
            {game.producer.map(element => <p key={element._id}>{element.producerName}</p>)}
            </div>
            <div className='single-info-section'>
            <p><b>Developers(s)</b></p>
            {game.developer.map(element => <p key={element._id}>{element.developerName}</p>)}
            </div>
            <p><b>Platforms</b></p>
            {game.releaseDate.map(element => {
                return(
                    <div className='single-info-section' key={element._id}>
                        <p><b>{element.platform}</b></p>
                        {element.time.map(element => {
                            return <p key={element._id}>{element.country + ' '}{element.release}</p>
                        })}
                    </div>
                )
            })}
            <p><b>Images</b></p>
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
            </div>
            )
            : (<p>Loading...</p>)}
        </div>
    )
}

export default SingleGame