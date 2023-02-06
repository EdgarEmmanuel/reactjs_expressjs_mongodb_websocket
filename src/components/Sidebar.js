import { useState } from 'react';
import {Tab , Nav, Button} from 'react-bootstrap';
import Env from '../helpers/env';
import Conversations from './Conversations';
import Contacts from './Contacts';
import ModalContact from './ModalContact';
import ModalConversations from './ModalConversations';

function Sidebar({id}){
    const env = new Env();

    const [activeKey,setActiveKey] = useState(env.getConversationsKey());
    const conversationOpen = activeKey === env.getConversationsKey();
    const [openModalConv,setOpenModalConv] = useState(false);
    const [openModalCont,setOpenModalCont] = useState(false);

    function changeActive(e){
        e.preventDefault();

        //get the name of the active menu
        let menuActive = e.target.getAttribute("data-rb-event-key");

        // show the active menu to the user
        setActiveKey(menuActive);
    }

    function openModel(e){
        e.preventDefault();
        switch(activeKey){
            case env.getConversationsKey():
                setOpenModalConv(!openModalConv);
                setOpenModalCont(false);
            break;
            case env.getContactsKey():
                setOpenModalCont(!openModalCont);
                setOpenModalConv(false);
            break;
            default:
                setOpenModalCont(false);
                setOpenModalConv(false);
            break;
        }
    }

    return (
        <div style={{width:'270px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link onClick={changeActive}
                        eventKey={env.getConversationsKey()}>
                            Conversations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={changeActive} eventKey={env.getContactsKey()}>
                            Contacts
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={env.getConversationsKey()}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={env.getContactsKey()}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>
                <div>
                    Your Phone Number : <span className="text-muted">{id}</span>
                </div>
                <Button onClick={openModel}>
                    New { conversationOpen ? env.getConversationsKey(): env.getContactsKey() }
                </Button>
            </Tab.Container>
            {/* open the modal for the conversations */}
            {openModalConv && <ModalConversations id={id}/>}

            {/* open the modal for the contacts  */}
            {openModalCont && <ModalContact id={id}/>}
        </div>
    )
}

export default Sidebar;
