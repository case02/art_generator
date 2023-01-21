import React, {useEffect, useState} from 'react'
import { Figure, Modal} from 'react-bootstrap';
import {
	ref,
	getDownloadURL,
	listAll,
} from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase.js';

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
                    src={props.imgurl}
                    alt='selected'
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
            </Modal.Body>
        </Modal>
    );
}

export default function UserImages() {
    const { currentUser } = useAuth();
    const [userImageUrls, setUserImageUrls] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalUrl, setModalUrl] = React.useState('');
    const openModal = (e) => {
            setModalUrl(e.target.src)
            setModalShow(true)
            console.log(e.target.src)
        }
    
    useEffect(() => {
        if (currentUser) {
            const userImagesListRef = ref(storage, `images/${currentUser.uid}`);

            // list all current user images
            listAll(userImagesListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setUserImageUrls((prev) => [...prev, url]);
                    });
                });
            });
        }
     

    }, []);

  return (
		<>
			{currentUser ? (
				<Figure className='mt-4'>
					{userImageUrls.map((url, i) => {
				return (
					<div key={i} onClick={(e) => openModal(e)}>
						<Figure.Image
							fluid
							rounded
							className='m-1 user-image'
							alt='user images'
							src={url}
						/>
					</div>
				);
			})}
					{/* <div onClick={(e) => openModal(e)}>
						<Figure.Image
							fluid
							rounded
							className='m-1 user-image'
							alt='user images'
							src={
								'https://images.pexels.com/photos/8588477/pexels-photo-8588477.jpeg'
							}
						/>
					</div> */}
				</Figure>
			) : null}
			<ShowImageModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                imgurl={modalUrl}
            />
		</>
	);
}
