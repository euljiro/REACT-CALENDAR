import firebase from 'firebase/app';
import 'firebase/firestore' ;

const firebaseConfig = {
        apiKey: "AIzaSyBi1lC_BwztOXaqIw76dBY232jEpQ8mEpw",
        authDomain: "calendar-app99.firebaseapp.com",
        projectId: "calendar-app99",
        storageBucket: "calendar-app99.appspot.com",
        messagingSenderId: "712510198406",
        appId: "1:712510198406:web:179d798cb0a105a164f707",
        measurementId: "G-MGB9FK3GDY"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {firestore};