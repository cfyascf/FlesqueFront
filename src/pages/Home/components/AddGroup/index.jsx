import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';

export default function AddGroup(props){
    const [name, setName] = useState("")
    const { handleRequest } = requestHook('/group/create', 'POST')

    async function handleSave(){
        const response = await handleRequest({ name: name });
        console.log(response)
        props.hideModal();
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Group name</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
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