import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import reducer from './reducers/index.js';

import './index.css';

let store = createStore(reducer);

console.log("Initial state = ", store.getState());

let unsubscribe = store.subscribe(() =>
  console.log("Updated state = ", store.getState())
);

import { addColumn } from './actions/index.js';
store.dispatch(addColumn('foo'));

unsubscribe();

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
