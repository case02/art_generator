import React, { useState, useEffect } from 'react'
import GenerativeArt from '../../component/GenerativeArt'
import { useAuth } from '../../contexts/AuthContext';
import Nav from '../../component/Nav'
import {
	ref,
	getDownloadURL,
	listAll,
} from 'firebase/storage';
import { storage } from '../../firebase.js';
import './style.css'

export default function Home() {
	const { currentUser } = useAuth();
	const [imageUrls, setImageUrls] = useState([]);
	const imagesListRef = ref(storage, 'images/');
	const signedIn = () => {
		if (currentUser) {
			return (
				<a href='/generator'>
					<button>GET STARTED</button>
				</a>
			);
		} else {
			return (
				<a href='/signup'>
					<button>GET STARTED</button>
				</a>
			);
		}
	}
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
		<div className='home-container'>
			<Nav />
			<section className='sectionOne'>
				<div className='home-content'>
					<img
						className='home-img animate-lower-left'
						src='https://images.pexels.com/photos/5794559/pexels-photo-5794559.jpeg'
						alt='potrait'
					/>
					<section className='cta animate-lower-right'>
						<h2>ARTGEN</h2>
						<p>A place to upload images...</p>
						{signedIn()}
					</section>
				</div>
			</section>
			<div className="divider">
				
			</div>

			<section className='slideshow'>
				<br />
				<h1>Recent Uploads</h1>
				<div className='tech-slideshow'>
					<div className='mover-1'>
						{imageUrls.map((url, i) => {
							return (
								<img
									className='m-1 all-image'
									alt='all images'
									src={url}
								/>	
							);
						})}
					</div>

				</div>
			</section>
		</div>
	);
}
