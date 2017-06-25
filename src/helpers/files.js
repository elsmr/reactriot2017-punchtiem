import { firebaseImages } from './firebase';

export const uploadFile = ({ run, venue: { id }, file }) => {
  return firebaseImages({ run, venue: id }).put(file);
};
