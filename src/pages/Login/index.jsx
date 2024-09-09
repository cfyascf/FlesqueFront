import styled from './styles.module.sass'
import { loginHook } from '../../hooks/login.hook'
import { requestHook } from '../../hooks/request.hook'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext, UserProvider } from '../../contexts/user.context'

export const Login = () => {
    const { email, fillEmail, password, fillPassword, error, showError } = loginHook
    const { handleRequest } = requestHook('http://127.0.0.1/users/auth', 'POST')
    const { setFullname, setId } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSend = (e) => {
        e.preventDefault()

        console.log(email, password)

        const data = {
            email: email,
            password: password
        }

        console.log(data)

        try {
            const response = handleRequest(data)
            const user = response.obj

            setFullname(user.fullname)
            setId(user.setId)

            navigate('/home')

        } catch(err) {
            showError()
        }
    }

    return <>
        <div className={styled.page}>
            <div className={styled.formContainer}>
                <h1>Login</h1>
                <input className={styled.input} type='text' placeholder='Insira o email' onChange={(e) => fillEmail(e.target.value)}></input>
                <input className={styled.input} type='text' placeholder='Insira a senha' onChange={(e) => fillPassword(e.target.value)}></input>
                <button className={styled.button} onClick={handleSend}>Enviar</button>
                <div className={error ? styled.error : styled.error_hidden}>
                    Incorrect login data.
                </div>
            </div>
        </div>
    </>
}