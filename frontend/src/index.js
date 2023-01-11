import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBB2Vpy8Ea8XUKrT5SJtcl5dnUjyua3QkY",
  authDomain: "fern-stack-1a914.firebaseapp.com",
  databaseURL: "https://fern-stack-1a914-default-rtdb.firebaseio.com",
  projectId: "fern-stack-1a914",
  storageBucket: "fern-stack-1a914.appspot.com",
  messagingSenderId: "200682092915",
  appId: "1:200682092915:web:ef0d93a7de3614133bed06",
  measurementId: "G-TDX26B15N3"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

// add a function for sending requests from your React frontend to your Node.js + Express backend
export var url = "http://localhost:3000/"
export function regularRequest(handler, method, body, callback) {
  const http = new XMLHttpRequest()
  http.responseType = 'json'

  http.open(method, url + handler, true)

  if (body != null) {
    http.setRequestHeader('Content-Type', 'application/json')
  }

  http.onload = function() {
    callback(http.response())
  }

  http.send(JSON.stringify(body))
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<App />
	</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
