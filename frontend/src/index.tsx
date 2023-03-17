import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { Provider } from 'react-redux';
import store from './redux/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let persistor=persistStore(store)

root.render(
  <React.StrictMode>
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>
   </React.StrictMode>
);


