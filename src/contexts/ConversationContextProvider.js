import React , {useContext, useEffect, useState,useCallback} from 'react';
import UseLocalStorage from '../hooks/useLocalStorage';
import {UseContacts} from './ContactsContextProvider';
import { useSocket } from './SocketProvider';
import Env from '../helpers/env';
import axios from "axios";


const conversationContext = React.createContext();


export function useConversations(){
    return useContext(conversationContext);
}

export function ConversationContextProvider({id,children}){

    const env = new Env();

    const [conversations,setConversations] = UseLocalStorage('conversations',[]);
    const [selectConversationIndex,setSelectConversationIndex] = useState(0);
    const [chatId, setChatId] = UseLocalStorage('chatId', null);
    const {contacts} = UseContacts();
    const socket = useSocket();




    const getConversationsOfUser = async () => {
        const { data } = await axios.post("/conversations",{
            "user" : id
        });

        setConversations(prevConversations=>{
            return data;
        });
    }

    useEffect(()=>{
        getConversationsOfUser();
    },[id]);




    /**
     * funtion to create one conversation
     * @param {*} recipients
     */
    function createConversation(recipients){
        setConversations(prevConversations=>{
            return [...prevConversations,{recipients,messages:[]}]
        })
    }


    const addMessageToSelectedConversation = useCallback(async ({ recipients, text, sender, chat_identifier }) => {
            setChatId(chat_identifier);

        await getConversationsOfUser();

          /*
            setConversations(prevConversations => {

                let madeChange = false;
                const newMessage = {sender,text};
                const newConversation = prevConversations.map(
                    conversation => {
                        if(env.arrayEquality(conversation.recipients,recipients)){
                            madeChange = true;
                            return {
                                ...conversation,
                                messages:[ ...conversation.messages, newMessage ]
                            }
                        } else {
                            return conversation;
                        }
                    }
                );
                if(madeChange){
                    return newConversation ;
                }else{
                    return [
                        ...prevConversations,
                        {recipients ,messages:[newMessage]}
                    ]
                }
            });

           */


    },[conversations, chatId])



    useEffect(()=>{
        // verfiy if the socket is instantiated
        if(socket == null) return ;

        socket.on("receive-message",addMessageToSelectedConversation);

        // we remove the event
        return () => socket.off("receive-message");
    },[socket,addMessageToSelectedConversation])






    async function sendMessage(receivers,text){

        const chat = formattedConversations[selectConversationIndex].chat_identifier || null;

        socket.emit('send-message',
            {
                receivers,
                text,
                chat_identifier: chat
            }
        );

        await addMessageToSelectedConversation({recipients: receivers, text, sender: id, chat_identifier: chat}) ;
    }





    const formattedConversations = conversations.map((conversation,index)=>{
        // we loop through each id to find the name of the id
        const receivers = conversation.recipients.map((receiverId)=>{
            // inside the contacts array we do a comparison to
            // find the name of the id
            const contact = contacts.find(contact => {
                return contact.number === receiverId
            })
            // if we find the contact name or else we give the receiverId
            const name = (contact && contact.name) || receiverId;

            //we push the contact to the array of receivers
            return {id: receiverId, name};
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
        return { ...conversation, recipients:receivers, selected, messages }
    })


    const newConversations ={
        conversations:formattedConversations,
        sendMessage,

        // get the messages of the selected conversation
        selectedConversation : formattedConversations[selectConversationIndex],

        //index of the selected conversation
        selectConversationIndex:setSelectConversationIndex,
        selectChatId: setChatId,
        createConversation
    }

    return (
        <conversationContext.Provider value={newConversations}>
            {children}
        </conversationContext.Provider>
    )
}
