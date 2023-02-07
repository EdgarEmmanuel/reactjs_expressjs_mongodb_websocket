import { useConversations } from '../contexts/ConversationContextProvider';
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';

function Dashboard({id}){
    const {selectedConversation} = useConversations();
    return (
        <div className="d-flex" style={{height:'100vh'}}>
           <Sidebar phone_number={id} />
           {selectedConversation && <OpenConversation/>}
        </div>
    )
}

export default Dashboard;
