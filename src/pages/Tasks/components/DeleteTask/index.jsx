import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { requestHook } from '../../../../hooks/request.hook';

export default function DeleteTask(props){
    const { handleRequest } = requestHook('http://127.0.0.1:5000/task/create', 'DELETE')

    function handleDelete(){
        handleRequest({ task_id: props.id });
        props.hideModal();
    }

    return (
        <Modal show={props.open} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you want to delete this task?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hideModal}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={() => handleDelete()}>
                    Delete task
                </Button>
            </Modal.Footer>
        </Modal>
    )
}