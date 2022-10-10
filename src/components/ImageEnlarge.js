import { useState } from "react"

const ImageEnlarge = (props) => {
    const [hidden,setHidden] = useState(true)
    return (
        <div>
           {!hidden ? (
            <div className="image-enlarge">
            <p onClick={() => setHidden(event => !event)}>&#x2715;</p>
            <img src={props.game.mainImage} alt='game' />
            </div>
            ) : null}
            {props.game.mainImage ? (
            <img src={props.game.mainImage} alt='game' height={200} onClick={() => setHidden(event => !event)}/>
            ) : (<div style={{marginLeft: '22.5px'}} className="no-image">No image</div>)}
        </div>
    )
}

export default ImageEnlarge