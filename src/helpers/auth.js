import { firebaseAuth, googleAuthProvider } from "./firebase";

export function logout() {
  return firebaseAuth().signOut();
}

export function login() {
  return firebaseAuth().signInWithRedirect(googleAuthProvider);
}
