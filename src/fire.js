import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCC-rib5s-EWPFHduU4lOXvNkZiY-XlDlk",
  authDomain: "test-27931.firebaseapp.com",
  databaseURL: "https://test-27931.firebaseio.com",
  projectId: "test-27931",
  storageBucket: "test-27931.appspot.com",
  messagingSenderId: "628386213676",
  appId: "1:628386213676:web:e96b97b2581c7ee31f8689",
  measurementId: "G-GT3DX0Q0YH"
};

let fire = firebase.initializeApp(firebaseConfig);

export default fire;
