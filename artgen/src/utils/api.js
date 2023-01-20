import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

// FUNCTIONS

// get user from firestore db
export const getUserData = async (currentUser) => {
	const currentUserDocRef = doc(db, 'users', currentUser.uid);
	const currentUserDocSnap = await getDoc(currentUserDocRef);

	if (currentUserDocSnap.exists()) {
		return currentUserDocSnap.data();
	} else {
		// doc.data() will be undefined in this case
		console.log('No such document!');
	}

}

// add to users uploaded images array in firestore db
export const updateUserUploadedImages = async (currentUser, fieldValue ) => {
	const currentUserDocRef = doc(db, 'users', currentUser.uid);
	// const field = fieldParam;
	// Atomically add a new image to the "uploadedImages" array field.
	await updateDoc(currentUserDocRef, {
		uploadedImage: arrayUnion(fieldValue),
	});
};