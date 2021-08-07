import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyASYde4TGnoLxbizGykJcKf_JBbMGY-Oig",
    authDomain: "tech-products-1.firebaseapp.com",
    projectId: "tech-products-1",
    storageBucket: "tech-products-1.appspot.com",
    messagingSenderId: "421246340282",
    appId: "1:421246340282:web:6b5ef87d81fdcf14390683"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebaseApp.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();