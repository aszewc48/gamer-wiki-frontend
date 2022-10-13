import { useState } from "react"

const FilterMenu = (props) => {
    const [hidden,setHidden] = useState(true)
    const [hiddenGenre,setHiddenGenre] = useState(true)
    const [hiddenSubGenre,setHiddenSubGenre] = useState(true)
    const [hiddenDeveloper,setHiddenDeveloper] = useState(true)
    const [hiddenProducer,setHiddenProducer] = useState(true)
    const [hiddenPlatform,setHiddenPlatform] = useState(true)

    const handleGenreSearch = (event) => {
        const matchArray = props.filteredGames.filter(element => {
            return element.genre.toLowerCase().includes(event.target.value.toLowerCase())
        })
        props.searchGame(matchArray)
    }
    const handleSubGenreSearch = (event) => {
        const matchArray = props.filteredGames.filter(element => {
            return (
                element.subGenre.toLowerCase().includes(event.target.value.toLowerCase())
            )
        })
        props.searchGame(matchArray)
    }

    const handleProducerSearch = (event) => {
        const matchArray = props.filteredGames.map(element => {
            return element.producer.filter(element => {
                console.log('Producer Name:', element.producerName)
            return  (
            element.producerName.toLowerCase().includes(event.target.value.toLowerCase())    
            )
        })
        })
        props.searchGame(matchArray.flat().map(e => e.gameEdit)
        .reduce((a,c) => {
            if(!a.map(e => e._id).includes(c._id)){
                a.push(c)
            }
            return a;
        }, []))
    }
   
    const handleDeveloperSearch = (event) => {
        console.log('hi',props.gamesObject)
        const matchArray = props.filteredGames.map(element => {
            return element.developer.filter(element => {
            return (
                element.developerName.toLowerCase().includes(event.target.value.toLowerCase())
            )
        })
    })
        props.searchGame(matchArray.flat().map(e => e.gameEdit).reduce((a,c) => {
            if(!a.map(e => e._id).includes(c._id)){
                a.push(c)
            }
            return a;
        }, []))
    }
    
    const handlePlatformSearch = (event) => {
        const matchArray = props.filteredGames.map(element => {
                return element.releaseDate.filter(element => {
                return element.platform.toLowerCase().includes(event.target.value.toLowerCase())
            })
        })
        props.searchGame(matchArray.flat().map(e => e.gameEdit).reduce((a,c) => {
            if(!a.map(e => e._id).includes(c._id)){
                a.push(c)
            }
            return a;
        }, []))
    }
    return (
        <div className="filter-button">
            {!hidden ? (
                <div>
                    <button onClick={() => setHidden(s => !s)}>Filter by:</button>
                    <button onClick={() => setHiddenGenre(event => !event)}>Genre</button>
                    {!hiddenGenre && (<input type='text' placeholder="Search Genre" onChange={handleGenreSearch} />)}
                    <button onClick={() => setHiddenSubGenre(event => !event)}>Sub Genre</button>
                    {!hiddenSubGenre && (<input type='text' placeholder="Search Sub Genre" onChange={handleSubGenreSearch} />)}
                    <button onClick={() => setHiddenDeveloper(event => !event)}>Developer</button>
                    {!hiddenDeveloper && (<input type='text' placeholder="Search Developer" onChange={handleDeveloperSearch} />)}
                    <button onClick={() => setHiddenProducer(event => !event)}>Producer</button>
                    {!hiddenProducer && (<input type='text' placeholder="Search Producer" onChange={handleProducerSearch} />)}
                    <button onClick={() => setHiddenPlatform(event => !event)}>Platform</button>
                    {!hiddenPlatform && (<input type='text' placeholder="Search Platform" onChange={handlePlatformSearch} />)}
                </div>
            ) : null}
            {hidden ? (
            <button onClick={() => setHidden(s => !s)}>Filter</button>
            ) : null}
        </div>
    )
}

export default FilterMenu