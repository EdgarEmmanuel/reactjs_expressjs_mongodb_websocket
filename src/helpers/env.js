export default class Env{
    PREFIX = 'whatsapp-';
    CONVERSATIONS_KEY = "conversations";
    CONTACTS_KEY = "contacts";
    SETTINGS_KEY = "Parametres";
    PREFIX_BACK = "http://localhost:7000"

    getPrefix(){
        return this.PREFIX;
    }

    getPrefixUrlBack(){
        return this.PREFIX_BACK;
    }

    getConversationsKey(){
        return this.CONVERSATIONS_KEY;
    }

    getContactsKey(){
        return this.CONTACTS_KEY;
    }

    getSettingsKey(){
        return this.SETTINGS_KEY;
    }

    arrayEquality(array1,array2){
        // array1.sort();
        // array2.sort();
        return Array.isArray(array1) &&
            Array.isArray(array2) &&
            array1.length === array2.length &&
            array1.every((val, index) => val === array2[index]);
    }
}
