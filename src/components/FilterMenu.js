import { useState } from "react"

const FilterMenu = () => {
    const [hidden,setHidden] = useState(true)
    return (
        <div>
            {!hidden ? <p>Howdy</p> : null}
            <button onClick={() => setHidden(s => !s)}>Filter</button>
        </div>
    )
}

export default FilterMenu