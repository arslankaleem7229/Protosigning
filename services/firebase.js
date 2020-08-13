import firebase from 'firebase'
import "firebase/auth"
import "firebase/storage"

const config = {
    apiKey: "AIzaSyCL2eaUNeyMmLO07XaBK2-ufqS69Vw3TgE",
    authDomain: "protosigning-fc596.firebaseapp.com",
    databaseURL: "https://protosigning-fc596.firebaseio.com",
    projectId: "protosigning-fc596",
    storageBucket: "protosigning-fc596.appspot.com",
    messagingSenderId: "984662131604",
    appId: "1:984662131604:web:4668c9613d1b5769328581",
    measurementId: "G-7FDJ3GNFZY"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
export const auth = firebase.auth()
export const db = firebase.database()
export const storage = firebase.storage()

// export default {
//     auth,
//     db
// }