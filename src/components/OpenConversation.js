import React,{useState, useCallback} from 'react';
import { Form, InputGroup,Button} from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationContextProvider';
import {UseContacts} from "../contexts/ContactsContextProvider";
import axios from 'axios';


export default function OpenConversation(){
    const [text,setText] = useState();
    const {contacts} = UseContacts()
    const setRef = useCallback((node)=>{
        if(node) node.scrollIntoView({ smooth : true });
    },[])
    const {sendMessage,conversations,selectedConversation} = useConversations();

    async function handleSubmit(e){
        e.preventDefault();

        let currentDate = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}==${new Date().toLocaleTimeString()}`;
        // console.log(conversations);
        //console.log(selectedConversation.messages);

        sendMessage(
            selectedConversation.recipients.map(r=>r.id),
            text
        );

        //clear the field
        setText("");
    }

    // get the index of the last message
    const lastMessage = selectedConversation.messages.length - 1;
    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3 overflow-scroll">

                    {selectedConversation.messages.map((message,index)=>(

                        <div
                        ref = { (lastMessage===index) ? setRef : null}
                        key={index}
                        className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}>
                            <div className={
                                    `rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' :'bg-success' }`}>
                                {message.text}
                            </div>
                            <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                { (message.fromMe) ? `me` : message.sender  }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                        as="textarea"
                        required
                        value={text}
                        onChange={ e => setText(e.target.value)}
                        style={{height:'75px',resize:'none'}}
                        />
                        <InputGroup.Append>
                        <Button type="submit">SEND</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
