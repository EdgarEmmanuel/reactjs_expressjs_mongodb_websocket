import { Button, Modal,Form } from "react-bootstrap";
import {useRef} from 'react';
import { UseContacts } from '../contexts/ContactsContextProvider';

function ModalContact({id, setCloseContactModal}){
    const nameContact = useRef();
    const numberOfTheContact = useRef();
    const {createContact} = UseContacts();

    function handleSaveContact(e){
        e.preventDefault();
        if(numberOfTheContact.current.value==="" || nameContact.current.value===""){
             return;
        }else{
            createContact(numberOfTheContact.current.value,nameContact.current.value);
        }
        numberOfTheContact.current.value = "";
        nameContact.current.value = "";
    }
    return (
        <Modal.Dialog>
                <Modal.Header closeButton onClick={() => setCloseContactModal(false)}>
                    <Modal.Title>Add New Contact</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSaveContact}>
                        <Form.Group>
                            <Form.Label>
                                Nom
                            </Form.Label>
                            <Form.Control type="text" ref={nameContact}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Numero de telephone
                            </Form.Label>
                            <Form.Control type="text" ref={numberOfTheContact}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Enregsitrer</Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>

                </Modal.Footer>
        </Modal.Dialog>
    )
}

export default ModalContact;
