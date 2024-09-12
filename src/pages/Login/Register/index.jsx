import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../hooks/request.hook';

export default function Register(props){
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [birth, setBirth] = useState("")
    const { handleRequest } = requestHook()

    async function handleSave(){
        const user = { fullname, password, email, birth }
        const response = await handleRequest('/user/register', 'POST', user);
        props.hideModal();
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Full name</Form.Label>
                    <Form.Control value={fullname} type="text" placeholder="Full Name" onChange={(e) => setFullname(e.target.value)}/>
                </Form>
                <Form>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </Form>
                <Form>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control value={email} type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                </Form>
                <Form>
                    <Form.Label>Birth</Form.Label>
                    <Form.Control value={birth} type="text" placeholder="Birth date" onChange={(e) => setBirth(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={() => handleSave()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}