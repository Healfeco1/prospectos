import firebase from 'firebase'
// // import 'firebase/auth'
// // import 'firebase/app'
// // import 'firebase/firestore'

var firebaseConfig = {
    // apiKey: "AIzaSyAkxZMP6KJnsCKFqGbgOpZuBwHfb-ysy3c",
    // authDomain: "concredito-f5512.firebaseapp.com",
    // databaseURL: "https://concredito-f5512-default-rtdb.firebaseio.com",
    // projectId: "concredito-f5512",
    // storageBucket: "concredito-f5512.appspot.com",
    // messagingSenderId: "877734757930",
    // appId: "1:877734757930:web:ed8bb0372f15bb8819e553",
    // measurementId: "G-7K32XWFZ1F"
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  }
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth();

export default firebase;