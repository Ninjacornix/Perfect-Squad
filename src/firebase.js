import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC61kQ-sX8XVD4T-CX368SOnmR4bIXydCU",
    authDomain: "perfect-squad-a7c57.firebaseapp.com",
    databaseURL: "https://perfect-squad-a7c57.firebaseio.com",
    projectId: "perfect-squad-a7c57",
    storageBucket: "perfect-squad-a7c57.appspot.com",
    messagingSenderId: "906524239003",
    appId: "1:906524239003:web:93fc52432a600e3fb6523e"
};

firebase.initializeApp(firebaseConfig);

export default firebase;