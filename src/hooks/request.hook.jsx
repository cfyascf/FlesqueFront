import { useState } from "react"
import axios from "axios"

export const requestHook = (link, verb) => {
    const [url, setUrl] = useState('http://127.0.0.1:5000' + link)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const handleRequest = async (data) => {
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
        }
        

        if(response == null) {
            throw new Error()
        }

        return response
    }

    return { handleRequest }
}