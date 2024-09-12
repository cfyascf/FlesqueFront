import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';
import { useParams } from 'react-router-dom';

export default function UpdateTask(props){
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const { groupId } = useParams()
    const { handleRequest } = requestHook()

    useEffect(() => {
        handleGetTask()
    }, [props.open])

    async function handleGetTask(){
        try {
            const response = await handleRequest(`/task?id=${props.id}`, 'GET');
            setTitle(response.data.task.title);
            setDesc(response.data.task.desc);
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSave(e){
        e.preventDefault()

        const task = { title, desc }
        await handleRequest('/task/update', 'PUT', { task_id: props.id, title: title, desc: desc })

        props.hideModal()
        window.location.reload()
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Task name</Form.Label>
                        <Form.Control value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={desc} type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)}/>
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