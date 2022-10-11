const SearchBar = (props) => {
    const handleSearch = (event) => {
        const matchArray = props.filteredGames.filter(element => {
            return element.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        props.searchGame(matchArray)
    }
    return (
        <div style={{width: '100%'}}>
            <input className="search-bar" type='text' placeholder="Search" onChange={handleSearch} />
        </div>
    )
}

export default SearchBar