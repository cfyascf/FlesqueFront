import { useState } from "react"
import axios from "axios"

export const requestHook = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const handleRequest = async (uri, verb, data) => {
        const [url, setUrl] = useState('http://127.0.0.1:5000' + uri)
        let response = ''

        switch(verb) {
            case 'POST':
                response = await axios.post(url, data, config)
                break

            case 'GET':
                response = await axios.get(url, config)
                break

            case 'PUT':
                response = await axios.put(url, data, config)
                break

            case 'DELETE':
                response = await axios.delete(url, data, config)
        }
        

        if(response == null) {
            throw new Error()
        }

        return response
    }

    return { handleRequest }
}