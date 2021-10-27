import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCnn6oqVFb386VQTzsqaj_YBdt7imBNosI",
  authDomain: "moodboard-56237.firebaseapp.com",
  databaseURL: "https://moodboard-56237-default-rtdb.firebaseio.com",
  projectId: "moodboard-56237",
  storageBucket: "moodboard-56237.appspot.com",
  messagingSenderId: "680898690314",
  appId: "1:680898690314:web:de21dc03a32e9ccddd0ef3",
  measurementId: "G-TL549N47WZ"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export function getData(){
  return firebase.database().ref("users/" + firebase.auth().currentUser.uid).once("value").then(function (snapshot) {
    const newState = snapshot.val();
    console.log(newState);
    return newState;
  });
}

export function postData(name, class_year, goals, profile){
    const storageRef = firebase.storage().ref();
    const metadata = {
      contentType: profile.type,
    };
    console.log(profile.name);
    storageRef.child("images/" + profile.name).put(name, metadata).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        database.ref('users/' + currentUser().uid).update({
          name: name,
          class_year: class_year,
          goals: goals,
          profile: url
        })
      })
    })
}

export function newAccount(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          database.ref("users/" + firebase.auth().currentUser.uid)
          .set({
            name: "",
            email: email,
            password: password,
            class_year: "",
            goals: "",
            profile: "",
          })
          resolve(firebase.auth().currentUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
}

export function signIn(email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve(firebase.auth().currentUser);
          console.log("Successful sign-in");
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  export function currentUser() {
    return firebase.auth().currentUser;
  }