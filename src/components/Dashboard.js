import { useConversations } from '../contexts/ConversationContextProvider';
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';

function Dashboard({id, setId}){
    const {selectedConversation} = useConversations();
    return (
        <div className="d-flex" style={{height:'100vh'}}>
           <Sidebar phone_number={id} setIdData={setId}/>
           {selectedConversation && <OpenConversation/>}
        </div>
    )
}

export default Dashboard;
