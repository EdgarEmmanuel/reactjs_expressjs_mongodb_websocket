import React, {useRef} from 'react';
import axios from 'axios';
import '../assets/styles/login.css';
import {Container,Form,Button} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Env from '../helpers/env';

function Login({onIdSubmit}){
    const loginRef = useRef();
    const passwordRef = useRef();
    const env = new Env();
    /**
     * when the user create an other button
     */
    function sendGoodNumber(e){
        e.preventDefault();
        // send the data to the parent component
        onIdSubmit(uuidv4());
    }

    /**
     * when the user passes its own id
     */
    function handleSubmit(e){
        e.preventDefault();
         axios.post(`/login`,
            {
                'login':loginRef.current.value,
                'password':passwordRef.current.value
            }).then((data)=>{
                console.log(data.data)
                if(data.data !== undefined && data.data.length > 0){
                    // send the connected user id to the parent component
                    onIdSubmit(data.data[0].numero);
                } else {
                    onIdSubmit(null);
                }
        });

         // we reinitia;lize all the value
        loginRef.current.value="";
        passwordRef.current.value="";

    };

    return (
        <Container className="align-items-center d-flex" style={{height:'100vh'}}>
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label>
                        Login
                    </Form.Label>
                    <Form.Control type="text" ref={loginRef}></Form.Control><br/>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" ref={passwordRef}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" style={{margin:"5px 5px"}}> Se Connecter </Button>
                {/*<Button variant="success" onClick={sendGoodNumber}> New Id </Button>*/}
            </Form>
        </Container>
    )
}

export default Login;
