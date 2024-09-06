import { createContext } from 'react'

const UserContext = createContext()

export const UserProvider = () => {
    const [fullname, setFullname] = useState('')
    const [id, setId] = useState(null)

    return (
        <UserContext.Provider value={{
            fullname, setFullname,
            id, setId
        }}>
        </UserContext.Provider>
    )
}