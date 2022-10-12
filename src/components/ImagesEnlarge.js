import { useState } from "react"

const ImagesEnlarge = (props) => {
    const [hidden,setHidden] = useState(true)
    return (
        <div>
           {!hidden ? (
            <div className="image-enlarge">
            <p onClick={() => setHidden(event => !event)}>&#x2715;</p>
            <img src={props.element.url} alt='game' />
            </div>
            ) : null}
            {props.element.url ? (
                <img src={props.element.url} alt='game' onClick={() => setHidden(event => !event)} height={150} width={150}/>
            ) : (<div style={{marginLeft: '22.5px'}} className="no-image">No image</div>)}
        </div>
    )
}

export default ImagesEnlarge