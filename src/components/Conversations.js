import {useConversations} from '../contexts/ConversationContextProvider';
import { ListGroup } from 'react-bootstrap';
import {useEffect} from "react";

function Conversations(){
    const {conversations,selectConversationIndex, selectChatId} = useConversations();

    // useEffect(() => {
    //    console.log(conversations);
    // },[])

    const findTheChatId = (conversation) => {
        selectChatId(conversation.chat_identifier);
    }

    return (
        <div className="conversations">
            <ListGroup>
                <h1>Conversations</h1>
                {conversations.length > 0 && conversations.map((conversation,index)=>(
                    <ListGroup.Item key={index}
                        onClick={()=>{
                            selectConversationIndex(index);
                            findTheChatId(conversation)
                        }}
                        action
                        active={conversation.selected}
                    >
                        {/*{conversation.recipients.map((receiver)=>(receiver.name)).join(" , ")}*/}
                        {conversation.chat_identifier}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Conversations;
