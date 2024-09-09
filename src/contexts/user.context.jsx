import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [fullname, setFullname] = useState('')
    const [id, setId] = useState(null)

    return (
        <UserContext.Provider value={{
            fullname, setFullname,
            id, setId
        }}>
        { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }