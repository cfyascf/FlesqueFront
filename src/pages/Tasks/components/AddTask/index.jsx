import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';

export default function AddTask(props){
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const { handleRequest } = requestHook('http://127.0.0.1:5000/task/create', 'POST')

    function handleSave(){
        handleRequest({ title, desc });
        props.hideModal();
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
                        <Form.Control value={desc} type="text" placeholder="Name" onChange={(e) => setDesc(e.target.value)}/>
                    </Form.Group>
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