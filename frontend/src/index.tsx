import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { Provider } from 'react-redux';
import store from './redux/store'
import axios from 'axios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let persistor=persistStore(store)

axios.defaults.baseURL="https://classified-server.herokuapp.com"
// axios.defaults.baseURL="http://localhost:8800"

root.render(
  <React.StrictMode>
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>
   </React.StrictMode>
);


