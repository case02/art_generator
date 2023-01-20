import React, { useState, useEffect } from 'react'
import GenerativeArt from '../../component/GenerativeArt'
import {
	MDBBtn,
} from 'mdb-react-ui-kit';
import './style.css'

export default function Home() {

  return (
		<div className='home-container'>
			<div className='home-content'>
				<img src="https://images.pexels.com/photos/5794559/pexels-photo-5794559.jpeg" alt="potrait" />
				<section className="cta">
					<h2>ARTGEN</h2>
					<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultricies lectus sit amet enim pellentesque, nec ultricies eros rutrum.
					</p>
				<a href="/generator"><button>GET STARTED</button></a>
				</section> 
			</div>
		</div>
	);
}
