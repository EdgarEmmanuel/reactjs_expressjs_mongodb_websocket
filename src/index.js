import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Env from './helpers/env';

let env = new Env();

axios.defaults.baseURL = `${env.getPrefixUrlBack()}`;

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  //</React.StrictMode>,
  document.getElementById('root')
);

