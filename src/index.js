import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyBBr4MtU0FtuhIks-G7WFclCWghiQKi_VA",
    authDomain: "dragon-drop-1845b.firebaseapp.com",
    databaseURL: "https://dragon-drop-1845b.firebaseio.com",
    projectId: "dragon-drop-1845b",
    storageBucket: "dragon-drop-1845b.appspot.com",
    messagingSenderId: "65310100399"
 });

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
