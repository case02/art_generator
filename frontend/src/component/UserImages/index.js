import React, {useEffect, useState} from 'react'
import { Figure } from 'react-bootstrap';
import {
	ref,
	getDownloadURL,
	listAll,
} from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase.js';

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
        <Figure>
			{userImageUrls.map((url, i) => {
				return (
                    <Figure.Image key={i} width={171} height={180} src={url} />
                )
			})}
		</Figure>
        : null}
    </>
		
	);
}
