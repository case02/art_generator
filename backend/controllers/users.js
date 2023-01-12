// import { getDatabase, ref, set } from 'firebase/database';

// export function writeUserData(userId, name, email, imageUrl) {
// 	const db = getDatabase();
// 	set(ref(db, 'users/' + userId), {
// 		username: name,
// 		email: email,
// 		profile_picture: imageUrl,
// 	});
// }

// router.post('/test', async (req, res) => {
// 	writeUserData(1,'casey','123@g.com', 'someurl.com')
// 	console.log('sent data')
// });