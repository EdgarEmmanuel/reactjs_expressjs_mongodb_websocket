import React , {useContext, useEffect, useState,useCallback} from 'react';
import UseLocalStorage from '../hooks/useLocalStorage';
import {UseContacts} from '../contexts/ContactsContextProvider';
import { useSocket } from './SocketProvider';
import Env from '../helpers/env';


const conversationContext = React.createContext();


export function useConversations(){
    return useContext(conversationContext);
}

export function ConversationContextProvider({id,children}){

    const env = new Env();

    const [conversations,setConversations]=UseLocalStorage('conversations',[]);
    const [selectConversationIndex,setSelectConversationIndex] = useState(0);
    const {contacts} = UseContacts();
    const socket = useSocket();

    /**
     * funtion to create one conversation
     * @param {*} selectedIds
     */
    function createConversation(selectedIds){
        setConversations(prevConversations=>{
            return [...prevConversations,{selectedIds,messages:[]}]
        })
    }

    const addMessageToSelectedConversation = useCallback(({receivers,text,sender,hour}) => {
        setConversations(prevConversations=>{
            let madeChange = false;
            const newMessage = {sender,text,hour};
            const newConversation = prevConversations.map(
                conversation => {
                    if(env.arrayEquality(conversation.selectedIds,receivers)){
                            madeChange = true;
                            return {...conversation,
                                selectedIds:receivers,
                                messages:[...conversation.messages,newMessage]
                            }
                    }
                    return conversation;
                }
            )

            if(madeChange){
                return newConversation;
            }else{
                return [
                    ...prevConversations,
                    {selectedIds:receivers,messages:[newMessage]}
                ]
            }
        })
    },[env,setConversations])

    useEffect(()=>{
        // verfiy if the socket is instantiated
        if(socket == null) return ;

        socket.on("receive-message",addMessageToSelectedConversation);

        // we remove the event
        return ()=>socket.off("receive-message");
    },[socket,addMessageToSelectedConversation])

    function sendMessages(receiver_ids,message,hour){
        // send messages to everyone else
        socket.emit('send-message',{receivers:receiver_ids,text:message})
        addMessageToSelectedConversation({receivers:receiver_ids,text:message,sender:id,hour:hour})
    }


    const formattedConversations = conversations.map((conversation,index)=>{
        // we loop through each id to find the name of the id
        const receivers = conversation.selectedIds.map((receiverId)=>{
            // inside the contacts array we do a comparison to
            // find the name of the id
            const contact = contacts.find(contact => {
                return contact.number === receiverId
            })
            // if we find the contact name or else we give the receiverId
            const name = (contact && contact.name) || receiverId;

            //we push the contact to the array of receivers
            return {...contact};
        })


        const messages = conversation.messages.map((message)=>{
            //console.log(message);
            const senderWithName = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (senderWithName && senderWithName.name) || message.sender;
            const fromMe = id === message.sender;

            return {...message,name,fromMe};
        })
        //if the conversation is the conversation selected
        const selected = index === selectConversationIndex;
        //we push the receivers in the conversation array
        return {...conversation,selectedIds:receivers,selected,messages}
    })


    const newConversations ={
        conversations:formattedConversations,
        sendMessages,

        // get the messages of the selected conversation
        selectedConversation : formattedConversations[selectConversationIndex],

        //index of the selected conversation
        selectConversationIndex:setSelectConversationIndex,
        createConversation
    }

    return (
        <conversationContext.Provider value={newConversations}>
            {children}
        </conversationContext.Provider>
    )
}
