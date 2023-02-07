import {UseContacts} from '../contexts/ContactsContextProvider';
import {ListGroup} from 'react-bootstrap';
import {useEffect} from "react";

function Contacts(){
    const {contacts}  = UseContacts();

    // useEffect(() => {
    //     console.log(contacts);
    // },[])

    return (
        <ListGroup>
            <h1>Contacts</h1>
            {contacts.length > 0 && contacts[0] !== undefined && contacts[0].data.map((contact,id) =>
                <ListGroup.Item key={id}>
                    {contact.name}
                    <h6>
                        {contact.number}
                    </h6>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}

export default Contacts;
