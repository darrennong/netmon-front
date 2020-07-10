import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'
import './index.css';
import App from './container/APP';
import * as serviceWorker from './serviceWorker';
import { store } from './init/store';
import socket from './init/socket';
//dotenv.config();
configDotenv({
  path: resolve(__dirname, "../.env")
})
console.log(process.env);
socket.init(store);
socket.connect();
const MOUNT_NODE = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  MOUNT_NODE
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
