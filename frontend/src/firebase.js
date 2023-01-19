// import firebase from 'firebase/app';
// import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

//auth-development
const firebaseConfig = {
	apiKey: 'AIzaSyDfRRkp8JgwH81790OU8IYxhVG_FWwwXDE',
	authDomain: 'artgen-auth-dev.firebaseapp.com',
	projectId: 'artgen-auth-dev',
	storageBucket: 'artgen-auth-dev.appspot.com',
	messagingSenderId: '719374139680',
	appId: '1:719374139680:web:aabafc2972d7ad0ab41745',
};
// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FIRBASE_API_KEY,
// 	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_FIRBASE_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_FIRBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_FIRBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_FIRBASE_APP_ID,
// };

// initializes firbase
const app = firebase.initializeApp(firebaseConfig);

// firebase authorization and storage
export const storage = getStorage(app);
export const auth = app.auth();
export const db = getFirestore(app);
// export const firestoreDB = getFirestore(app, {
// 	experimentalForceLongPolling: true, // this line
// 	useFetchStreams: false, // and this line
// });
export default app;
