import '../assets/styles/App.css';
import UseLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Login from './Login';
import {ContactsContextProvider} from '../contexts/ContactsContextProvider';
import {ConversationContextProvider} from '../contexts/ConversationContextProvider';
import {SocketProvider} from '../contexts/SocketProvider';
import Env from '../helpers/env';
import {useState} from "react";

function App() {
  let env = new Env();
  const [id,setId] = UseLocalStorage('id');
  //const [id,setId] = useState(localStorage.getItem('id'));
  const DASH = (
    <SocketProvider id={id}>
      <ContactsContextProvider id={id}>
        <ConversationContextProvider id={id}>
          <Dashboard id={id} />
        </ConversationContextProvider>
      </ContactsContextProvider>
    </SocketProvider>
  )
  return (
    <div className="App">
      { (id==undefined || id==null) ? <Login onIdSubmit = {setId} /> : DASH }
    </div>
  );
}

export default App;
