import React, {useContext, useEffect, useState} from 'react';
import UseLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios';

const contactsContext = React.createContext();

export function UseContacts(){
    return useContext(contactsContext);
}

export function ContactsContextProvider({id,children}){
    // put the array of contacts in the localStorage
    const [contacts,setContacts] = UseLocalStorage('contacts', []);

    const getData = async () => {
        const { data } = await axios.post("/contacts",{
            "user":id
        });
        setContacts(prevContacts=>{
            //return [...prevContacts,{data:data.contacts}];
            return [{data:data.contacts}];
        })
    }

    useEffect(()=>{
        getData();
    },[id]);

    // create one contact and append to the array
    async function createContact(idCon,name){
        await axios.post("/saveContact",
            {
                "connected_user_phone_number": id,
                "numberContact": idCon,
                "nameContact": name
            })
            .then((data)=>{
                if(data.data.success!=null){
                    if(data.data.success){
                        //setContacts(data.data.contacts);
                        setContacts(prevContacts=>{
                            //return [...prevContacts,{data:data.data.contacts}];
                            return [{data:data.data.contacts}];
                        })
                    }else{
                        setContacts([]);
                    }
                }
            })
            .catch((err)=>{
                throw err;
            })
        // setContacts(prevContacts=>{
        //     return [...prevContacts,{id,idCon,name}];
        // })
    }
    return (
        <contactsContext.Provider value={{contacts,createContact}}>
            {children}
        </contactsContext.Provider>
    )
}
