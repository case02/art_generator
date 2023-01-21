import React, { useState, useEffect } from 'react'
import GenerativeArt from '../../component/GenerativeArt'
import {
	MDBBtn,
} from 'mdb-react-ui-kit';
import { useAuth } from '../../contexts/AuthContext';
import './style.css'

export default function Home() {
	const { currentUser } = useAuth();
	
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
  return (
		<div className='home-container'>
			<div className='home-content'>
				<img className="home-img" src="https://images.pexels.com/photos/5794559/pexels-photo-5794559.jpeg" alt="potrait" />
				<section className="cta">
					<h2>ARTGEN</h2>
					<p>
					A place to upload images...
					</p>
				{signedIn()}
				</section> 
			</div>
		</div>
	);
}
