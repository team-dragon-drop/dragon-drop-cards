import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './styles/card.css';
import './styles/column.css';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
firebase.initializeApp({
    apiKey: "AIzaSyBBr4MtU0FtuhIks-G7WFclCWghiQKi_VA",
    authDomain: "dragon-drop-1845b.firebaseapp.com",
    databaseURL: "https://dragon-drop-1845b.firebaseio.com",
    projectId: "dragon-drop-1845b",
    storageBucket: "dragon-drop-1845b.appspot.com",
    messagingSenderId: "65310100399"
 });

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
