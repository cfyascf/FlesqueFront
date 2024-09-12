import styled from './styles.module.sass'
import { loginHook } from '../../hooks/login.hook'
import { requestHook } from '../../hooks/request.hook'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext, UserProvider } from '../../contexts/user.context'

export const Login = () => {
    const { email, fillEmail, password, fillPassword, error, showError } = loginHook()
    const { handleRequest } = requestHook('/user/login', 'POST')
    const { setFullname, setId } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSend = async (e) => {
        e.preventDefault()

        const data = {
            email: email,
            password: password
        }

        try {
            const response = await handleRequest(data)
            const user = response.data.obj

            setFullname(user.fullname)
            setId(user.id)
            sessionStorage.setItem("@USERID", user.id)

            navigate('/home')
            
        } catch(err) {
            console.log("oi")
            showError()
        }
    }

    return <>
        <div className={styled.page}>
            <div className={styled.formContainer}>
                <h1 className={styled.title}>Login</h1>
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