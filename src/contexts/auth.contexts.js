import {useEffect,useState,createContext} from 'react'
import axios from 'axios'

const AuthContext = createContext()

function AuthProvider(props){
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [user,setUser] = useState(null)
    const storeToken = token => {
        localStorage.setItem('authToken',token)
    }
    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken')
        if(storedToken) {
            axios.get('http://localhost:3001/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(res => {
                    console.log(res)
                    const user = res.data
                    setIsLoading(false)
                    setIsLoggedIn(true)
                    setUser(user)
                })
                .catch(err => console.log(err))
        } else {
            setIsLoading(false)
            setIsLoggedIn(false)
            setUser(null)
        }
    }
    const removeAuthToken = () => {
        localStorage.removeItem('authToken')
    }
    const logOutUser = () => {
        removeAuthToken()
        authenticateUser()
    }
    useEffect(() => {
        authenticateUser()
    }, [])
    return (
        <AuthContext.Provider value={{isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}