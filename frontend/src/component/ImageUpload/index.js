import { useState, useEffect } from 'react';
import { getUserData, updateUserUploadedImages } from '../../utils/api';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
} from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase.js';
import { v4 } from 'uuid';


function ImageUpload() {
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);
	// console.log(imageUrls)
	const imagesListRef = ref(storage, 'images/');
	const { currentUser } = useAuth();

	// upload images to storage and return firebase url
	const uploadFile = () => {
		if (imageUpload == null) return;
		if (currentUser) {
			const userImageRef = ref(
				storage,
				`images/${currentUser.uid}/${imageUpload.name + v4()}`
			);
			// upload image to user specific images and add to url to user data
			uploadBytes(userImageRef, imageUpload).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					updateUserUploadedImages(currentUser, url);
					setImageUrls((prev) => [...prev, url]);
				});
			});
			const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

			//upload images to all images
			uploadBytes(imageRef, imageUpload).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setImageUrls((prev) => [...prev, url]);
				});
			});
		} else {
			const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

			//upload images to all images 
			uploadBytes(imageRef, imageUpload).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					setImageUrls((prev) => [...prev, url]);
				});
			});
		}
		
	};


	useEffect(() => {
		// list all images
		listAll(imagesListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setImageUrls((prev) => [...prev, url]);
				});
			});
		});
		
	}, []);

	return (
		<div className='App'>
			<input
				type='file'
				onChange={(event) => {
					setImageUpload(event.target.files[0]);
				}}
			/>
			<button onClick={uploadFile}> Upload Image</button>
			<br />
			{imageUrls.map((url, i) => {
				return <img key={i} src={url} />;
			})}
		</div>
	);
}

export default ImageUpload;
