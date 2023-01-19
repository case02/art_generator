import axios from 'axios';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

// FUNCTIONS

export async function getIndexRoute() {
	const { data } = await axios.get('http://localhost:8000');
	return data;
}

// get user from firestore db
export const getUserData = async (currentUser) => {
	const currentUserDocRef = doc(db, 'users', currentUser.uid);
	const currentUserDocSnap = await getDoc(currentUserDocRef);

	if (currentUserDocSnap.exists()) {
		console.log('Document data:', currentUserDocSnap.data());
	} else {
		// doc.data() will be undefined in this case
		console.log('No such document!');
	}

}

// update user in firestore db
export const updateUserData = async (currentUser, fieldValue ) => {
	const currentUserDocRef = doc(db, 'users', currentUser.uid);
	// const field = fieldParam;
	// Atomically add a new image to the "uploadedImages" array field.
	await updateDoc(currentUserDocRef, {
		uploadedImage: arrayUnion(fieldValue),
	});
};