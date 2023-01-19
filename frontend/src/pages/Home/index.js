import React, { useState, useEffect } from 'react'
import GenerativeArt from '../../component/GenerativeArt'
// firestore
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase';
import { Button } from 'react-bootstrap';

export default function Home() {
  const [user, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef)
  //     console.log(data)
  //   }
  //   getUsers()

  // }, [])

  const handleAdd = async (e) => {
		e.preventDefault();
		try {
			await setDoc(doc(db, 'cities', 'LA'), {
				name: 'Los Angeles',
				state: 'CA',
				country: 'USA',
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};

  return (
		<div>
			<div>
				Homepage
				<Button onClick={handleAdd}>Send</Button>
				{/* <GenerativeArt /> */}
			</div>
		</div>
	);
}
