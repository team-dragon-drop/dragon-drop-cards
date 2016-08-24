import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import reducer from './reducers/index.js';

import './index.css';

let dummyState = {
  columns: [
    {
      name: "The Good",
      cards: [
        { name: "We shipped stuff" },
        { name: "Lots of cake!" },
        { name: "New team members" },
        { name: "Game of Thrones session" },
        { name: "We made lots of money" }
      ]
    },
    {
      name: "The Bad",
      cards: [
        { name: "Lots of bugs" },
        { name: "Refactoring the whole app is hard" },
        { name: "Finding time for pairing is hard with meetings, etc." },
        { name: "Build keeps breaking" },
        { name: "VC quality is not great" },
        { name: "VC quality is not great" },
        { name: "VC quality is not great" },
        { name: "VC quality is not great" }
      ]
    },
    {
      name: "The Questions",
      cards: [
        { name: "What is next for the project?" },
        { name: "How often should we do retros?" },
        { name: "Are there going to be anymore team changes before EOFY?" }
      ]
    }
  ]
};
let store = createStore(reducer, dummyState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
