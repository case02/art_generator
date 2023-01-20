import React, {useEffect, useState} from 'react'
import { Figure } from 'react-bootstrap';
import {
	ref,
	getDownloadURL,
	listAll,
} from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase.js';
import './style.css'
export default function UserImages() {
    const { currentUser } = useAuth();
    const [userImageUrls, setUserImageUrls] = useState([]);

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
        {currentUser ?
        <Figure className="mt-4">
			{userImageUrls.map((url, i) => {
				return (
                        <Figure.Image fluid rounded className="m-1 user-image" key={i} alt='user images' src={url} /> 
                )
			})}
		</Figure>
        : null}
    </>
		
	);
}
