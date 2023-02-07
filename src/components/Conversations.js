import {useConversations} from '../contexts/ConversationContextProvider';
import { ListGroup } from 'react-bootstrap';
import {useEffect} from "react";

function Conversations(){
    const {conversations,selectConversationIndex} = useConversations();

    useEffect(() => {
       console.log(conversations);
    },[])

    return (
        <div className="conversations">
            <ListGroup>
                <h1>Receiver</h1>
                {conversations.map((conversation,index)=>(
                    <ListGroup.Item key={index}
                        onClick={()=>selectConversationIndex(index)}
                        action
                        active={conversation.selected}
                    >
                        {conversation.recipients.map((receiver)=>(receiver.name)).join(" , ")}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Conversations;
