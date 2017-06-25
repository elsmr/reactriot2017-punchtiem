import {
  firebaseAuth,
  googleAuthProvider,
  githubAuthProvider,
} from './firebase';

export function logout() {
  return firebaseAuth().signOut();
}

export function login(provider) {
  return provider === 'Google'
    ? firebaseAuth().signInWithRedirect(googleAuthProvider)
    : provider === 'GitHub'
      ? firebaseAuth().signInWithRedirect(githubAuthProvider)
      : new Error('Not a valid provider');
}
