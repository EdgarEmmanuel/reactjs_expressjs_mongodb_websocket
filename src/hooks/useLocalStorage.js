import {useEffect , useState} from 'react';
import Env from '../helpers/env';

let env = new Env();

function UseLocalStorage(key,initialValue){
    const prefixedKey = env.getPrefix()+key;

    const [value,setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey) ;
        if(jsonValue != null) return JSON.parse(jsonValue) ;
        if(typeof initialValue === 'function'){
            return initialValue()
        }else{
            return initialValue;
        }
    });

    useEffect(()=>{
        localStorage.setItem(prefixedKey,JSON.stringify(value));
    },[prefixedKey, value]);

    return [value,setValue];
}








export default UseLocalStorage;
