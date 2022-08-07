import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import{createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'; // index.js exports the function combineReducers
import './index.css';
import App from './App';

// create a store component that basically saves our state and data etc in redux form that is accessible all over the project.\

const store = createStore(reducers, compose(applyMiddleware(thunk)));

// UI stuff
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(    

    <Provider store={store}>
 
        <App />

        
    </Provider>

    );    
    
    