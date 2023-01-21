import React, { useState, useEffect } from 'react';
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
import TextToImage from '../TextToImage';
import { Figure, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import './style.css'

// image modal
function ShowImageModal(props) {
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            dialogClassName='modal-90w'>
            <Modal.Body className='modal-body'>
                <img
                    src={props.imgUrl}
                    alt='selected'
                    style={{ maxHeight: '80vh', maxWidth: '80vw' }}
                />
            </Modal.Body>
        </Modal>
    );
}

function ImageUpload() {
	const [imageUpload, setImageUpload] = useState(null);
	const [imageUrls, setImageUrls] = useState([]);
	const imagesListRef = ref(storage, 'images/');
	const { currentUser } = useAuth();
	const [modalShow, setModalShow] = React.useState(false);
	const [modalUrl, setModalUrl] = React.useState('');

	const openModal = (e) => {
		setModalUrl(e.target.src);
		setModalShow(true);
		console.log(e.target.src);
	};
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
			{/* <TextToImage /> */}
			<Form.Group
				controlId='formFile'
				className='m-4'
				style={{ maxWidth: '400px' }}>
				<Form.Control
					type='file'
					onChange={(event) => {
						setImageUpload(event.target.files[0]);
					}}
				/>
			</Form.Group>
			{imageUpload ? <Button onClick={uploadFile}> Upload Image</Button> : null}

			<br />
			<Figure className='mt-4'>
				{imageUrls.map((url, i) => {
					return (
						<div onClick={(e) => openModal(e)}>
							<Figure.Image
								fluid
								rounded
								className='m-1 user-image'
								key={i}
								alt='all images'
								src={url}
							/>
						</div>
					);
				})}
			</Figure>
			<ShowImageModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				imgUrl={modalUrl}
			/>
		</div>
	);
}

export default ImageUpload;
