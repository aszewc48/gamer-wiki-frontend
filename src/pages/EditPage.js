import {useState,useEffect} from 'react'
import {useParams,Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import GenreEdit from '../components/editors/GenreEdit'
import SubGenreEdit from '../components/editors/SubGenreEdit'
import MainImageEdit from '../components/editors/MainImageEdit'
import ProducerNameEdit from '../components/editors/ProducerNameEdit'
import ProducerEdit from '../components/editors/ProducerEdit'
import DeveloperEdit from '../components/editors/DeveloperEdit'
import DeveloperNameEdit from '../components/editors/DeveloperNameEdit'
import ReleaseDateEdit from '../components/editors/ReleaseDateEdit'
import PlatformEdit from '../components/editors/PlatformEdit'
import TimeEdit from '../components/editors/TimeEdit'
import ImagesEdit from '../components/editors/ImagesEdit'
import UrlEdit from '../components/editors/urlEdit'
import ContentEdit from '../components/editors/ContentEdit'
import HeaderDescriptionEdit from '../components/editors/HeaderDescriptionEdit'


const EditPage = () => {
    const {gameId} = useParams()
    const navigate = useNavigate()
    const [game,setGame] = useState('')
    const [hidden,setHidden] = useState(false)
    useEffect(() => {getSingleGame(gameId)}, [gameId])
    const getSingleGame = (gameId) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/game/${gameId}`)
            .then(res => {
                console.log(res.data.foundGameData, 'GET GAME')
                setGame(res.data.foundGameData)
            })
            .catch(err => console.log('Error retrieving single game data', err))
        }
    const deleteAll = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/edit/delete/all/${gameId}`, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
            .then(res => {
                console.log(res)
                navigate('/search')
            })
            .catch(err => console.log('Error deleting all:' , err))
    }
    return (
        <div>
            <h1>Edit Page</h1>
            {game ? (
            <div key={game.id}>
            <h1>{game.title}</h1>
            <div className='edit'style={{paddingTop: '2%'}}>
            {game.mainImage ? (
            <img src={game.mainImage} alt='game' height={200} width={200}/>
            ) : (<div className='no-image'>No Image</div>)}
            <MainImageEdit game={game} gameId={gameId} getSingleGame={getSingleGame}/>
            </div>
            <div className='single-info-section'>
            <div className='edit'>
            <p>Genre: {' ' + game.genre}</p>
            <GenreEdit game={game} gameId={gameId} getSingleGame={getSingleGame}/>
            </div>
            <div className='edit'>
            <p>Sub Genre: {' ' + game.subGenre}</p>
            <SubGenreEdit game={game} gameId={gameId} getSingleGame={getSingleGame}/>
            </div>
            </div>
            <div className='single-info-section'>
            <div className='edit' style={{display: 'flex',flexWrap: 'wrap', width: '70%'}}>
            <div className='edit-col'>
            <p ><b>Producer(s)</b></p>
            <ProducerEdit gameId={gameId} getSingleGame={getSingleGame}/>
            </div>
            {game.producer.map(element => {
                return (
                    <div key={element._id} className='edit'>
                        <p>{element.producerName}</p>
                        <ProducerNameEdit gameId={gameId} getSingleGame={getSingleGame} element={element}/>
                    </div>
                )
                })}
            </div>
            </div>
            <div className='single-info-section'>
            <div className='edit' style={{display: 'flex',flexWrap: 'wrap', width: '70%'}}>
            <div className='edit-col'>
            <p><b>Developers(s)</b></p>
            <DeveloperEdit gameId={gameId} getSingleGame={getSingleGame}/>
            </div>
            {game.developer.map(element => {
                return (
                    <div className='edit' key={element._id}>
                        <p key={element._id}>{element.developerName}</p>
                        <DeveloperNameEdit element={element} gameId={gameId} getSingleGame={getSingleGame}/>
                    </div>
                )
                })}
            </div>
            </div>
            <div className='single-info-section'>
            <div className='edit' style={{display: 'flex',flexWrap: 'wrap', width: '70%'}}>
            <div className='edit-col'>
            <p><b>Platforms</b></p>
            <ReleaseDateEdit gameId={gameId} getSingleGame={getSingleGame}/>
            </div>
            {game.releaseDate.map(element => {
                return(
                    <div className='edit' style={{display: 'flex',flexWrap: 'wrap', width: '40%'}} key={element._id}>
                        <div className='edit-col'>
                        <p><b>{element.platform}</b></p>
                        <PlatformEdit gameId={element._id} gamerId={gameId} element={element} getSingleGame={getSingleGame} />
                        </div>
                        {element.time.map(element => {
                            return (
                                <div className='edit' style={{marginLeft: '5%'}} key={element._id}>
                                <p>{element.release}</p>
                                <TimeEdit element={element} gameId={gameId} getSingleGame={getSingleGame}/>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            </div>
            </div>
            <div className='single-info-section'>
            <div className='edit' style={{display: 'flex',flexWrap: 'wrap', width: '70%'}}>
            <div className='edit-col'>
            <p><b>Images</b></p>
            <ImagesEdit gameId={gameId} getSingleGame={getSingleGame} />
            </div>
            {game.images.map(element => {
                return (
                    <div className='edit'  key={element._id}>
                        <a href={element.url}><img src={element.url} alt='game' height={150} width={150}/></a>
                        <UrlEdit element={element} gameId={gameId} getSingleGame={getSingleGame}/>
                    </div>
                )
            })}
            </div>
            </div>
            <div className='single-info-section'>
            <div className='edit' style={{display: 'flex',flexWrap: 'wrap', width: '100%'}}>
            <div className='edit-col'>
            <p><b>Content</b></p>
            <ContentEdit gameId={gameId} getSingleGame={getSingleGame} />
            </div>
            {game.content.map(element => {
                return (
                    <div key={element._id}>
                        <h2>{element.header}</h2>
                        <p>{element.description}</p>
                        <HeaderDescriptionEdit element={element} gameId={gameId} getSingleGame={getSingleGame}/>
                    </div>
                )
            })}
            </div>
            </div>
            <div className='edit-button'>
            <button><Link to={`/search/${game._id}`}>View Page</Link></button>
            <button onClick={() => setHidden(event => !event)}>Delete Page</button>
            {hidden && (
                <>
                <p>Are you sure you want to remove the entire page?</p>
                <button onClick={deleteAll}>Yes</button>
                <button onClick={() => setHidden(event => !event)}>No</button>
                </>
                )}
            </div>
            </div>
            )
            : (<p>Loading...</p>)}
        </div>
    )
}

export default EditPage