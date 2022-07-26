import { firebase } from "./firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";

const auth = getAuth(firebase);

export const signInFb = async (email, password) => {
    return new Promise((resolve, rejected) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user.uid);
            })
            .catch((error) => { rejected(error) })
        }
    )
};

export const signOutFb = async () => auth.signOut();

export const signUpFb = async (email, password) => {
    return new Promise((resolve, rejected) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user.uid);
            })
            .catch((error) => { rejected(error) })
    });
};

export const subscribeAuthStateChangedFb = (onSignedIn, onSignedOut) => (
    onAuthStateChanged(
        auth,
        (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                onSignedIn();
                console.log(`${user.uid} sign in`);
            } else {
                // User is signed out
                onSignedOut();
                console.log(`${user.uid} sign out`);
            }
        }
    )
);