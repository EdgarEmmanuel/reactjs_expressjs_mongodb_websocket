import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {UseContacts} from '../contexts/ContactsContextProvider';
import {useConversations} from '../contexts/ConversationContextProvider';

function ModalConversations({id}){
    const {contacts} = UseContacts()
    const {conversations,createConversation} = useConversations();
    const [selectedContacts,setSelectedContacts] = useState([]);
    function handleCheckBoxChange(id){
        setSelectedContacts(prevSelectedContacts=>{
            if(prevSelectedContacts.includes(id)){
                //if the id already exists we drop it from the array
                return prevSelectedContacts.filter((prev)=>prev!==id);
            }else{
                //else we push it to the array
                return [...prevSelectedContacts,id];
            }
        })
    }
    function valueOfTheCheckBox(id){
        //return true or false depends on if the id is in the array
        return selectedContacts.includes(id);
    }

    function handleSubmit(e){
        e.preventDefault();
        createConversation(selectedContacts);
    }
    return (
        <div>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>New Conversation</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact=>
                        <Form.Check
                            type="checkbox" 
                            value={valueOfTheCheckBox(contact.number)}
                            key={contact._id}
                            onChange={()=>handleCheckBoxChange(contact.number)}
                            label={contact.name}>
                        </Form.Check>
                    )}
                    <Button variant="primary" type="submit">
                        Create 
                    </Button>
                </Form>
            </Modal.Dialog>

        </div>
    )
}

export default ModalConversations;