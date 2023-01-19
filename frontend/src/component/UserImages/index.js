import React, {useEffect, useState} from 'react'
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
} from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../firebase.js';

export default function UserImages() {
    const { currentUser } = useAuth();
    const [userImageUrls, setUserImageUrls] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const userImagesListRef = ref(storage, `userImages/${currentUser.uid}`);

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
        <div>
			{userImageUrls.map((url, i) => {
				return <img key={i} src={url} />;
			})}
		</div>
        : null}
    </>
		
	);
}
