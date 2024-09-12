import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';
import { useParams } from 'react-router-dom';

export default function AddTask(props){
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [userFullname, setUserFullname] = useState("")
    const { groupId } = useParams()
    const { handleRequest } = requestHook()

    async function handleSave(e){
        e.preventDefault()

        const task = { title, desc, user_name: userFullname, group_id: groupId }
        await handleRequest('/task/create', 'POST', task)

        props.hideModal()
        window.location.reload()
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Task name</Form.Label>
                        <Form.Control value={title} type="text" placeholder="Name" onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={desc} type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Responsible user</Form.Label>
                        <Form.Control value={userFullname} type="text" placeholder="User" onChange={(e) => setUserFullname(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={(e) => handleSave(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}