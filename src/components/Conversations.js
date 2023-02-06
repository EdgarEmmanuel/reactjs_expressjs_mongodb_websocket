import {useConversations} from '../contexts/ConversationContextProvider';
import { ListGroup } from 'react-bootstrap';

function Conversations(){
    const {conversations,selectConversationIndex} = useConversations();
    
    return (
        <div className="conversations">
            <ListGroup>
                <h1>Receiver</h1>
                {conversations.map((conversation,index)=>(
                    <ListGroup.Item key={index}
                        onClick={()=>selectConversationIndex(index)}
                        action 
                        active={conversations.selected}
                    >
                        {conversation.selectedIds.map((receiver)=>(receiver.name)).join(" , ")}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Conversations;