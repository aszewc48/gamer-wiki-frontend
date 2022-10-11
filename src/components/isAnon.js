import { AuthContext } from "../contexts/auth.contexts"
import {useContext} from 'react'
import { Navigate } from "react-router-dom"


const IsAnon = (props) => {
    const {isLoggedIn,isLoading} = useContext(AuthContext)
    if(isLoading) {
        return <p>loading...</p>
    }
    if(isLoggedIn) {
        return <Navigate to='/' />
    } else {
        return props.children
    }
}

export default IsAnon