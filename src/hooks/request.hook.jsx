import { useState } from "react"
import axios from "axios"

export const requestHook = (link, verb) => {
    const [url, setUrl] = useState(link)

    const handleRequest = async (data) => {
        let response = ''

        switch(verb) {
            case 'POST':
                response = await axios.post(url, data)
                break

            case 'GET':
                response = await axios.get(url)
                break

            case 'PUT':
                response = await axios.put(url, data)
                break
        }
        

        if(response == null) {
            throw new Error()
        }

        return response
    }

    return { handleRequest }
}