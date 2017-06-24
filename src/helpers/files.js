import { firebaseImages } from './firebase';

export const uploadFile = ({ run, venue: { id }, file }) =>
  firebaseImages({ run, venue: id })
    .put(file)
    .then(snapshot => console.log('Uploaded a blob or file!'));
