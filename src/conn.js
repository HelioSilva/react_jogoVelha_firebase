import firebase  from 'firebase';

var config = {
    apiKey: "AIzaSyAP6Qv5RM1hyJgL2nstc7D-3Hiu01zKyR8",
    authDomain: "jogovelha-3586e.firebaseapp.com",
    databaseURL: "https://jogovelha-3586e.firebaseio.com",
    projectId: "jogovelha-3586e",
    storageBucket: "jogovelha-3586e.appspot.com",
    messagingSenderId: "215398147277"
  };
  firebase.initializeApp(config);

  export default firebase;