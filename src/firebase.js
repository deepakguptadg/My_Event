
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD42gOU-tmXSzoUdG_nX9GNj96ZmUlGrWA",
  authDomain: "my-event-d6a0a.firebaseapp.com",
  databaseURL: "https://my-event-d6a0a-default-rtdb.firebaseio.com",
  projectId: "my-event-d6a0a",
  storageBucket: "my-event-d6a0a.appspot.com",
  messagingSenderId: "834181670372",
  appId: "1:834181670372:web:822b7ee0b2f07b770d13f1",
};
const firebaseDB = firebase.initializeApp(firebaseConfig)
export default firebaseDB.database().ref()
export const auth = getAuth();