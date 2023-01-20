import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function TextToImage() {
	
	const [generatedImage, setGeneratedImage] = useState();


	const IMG4Me = async (event) => {
		event.preventDefault();
		// const axios = require('axios');
		const options = {
			method: 'GET',
			url: 'https://img4me.p.rapidapi.com/',
			params: {
				text: event.target.value,
				font: 'trebuchet',
				size: '12',
				fcolor: '000000',
				bcolor: 'FFFFFF',
				type: 'png',
			},
			headers: {
				'X-RapidAPI-Key': '79c4e1d4b1msh735e8dad6a07774p1f7566jsn247e331a76d6',
				'X-RapidAPI-Host': 'img4me.p.rapidapi.com',
			},
		};

		await axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}
	return (
		<div>
			<Form onSubmit={IMG4Me}>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Text to Image</Form.Label>
					<Form.Control
						type='text'
						placeholder='Search the for the image you want'
					/>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Generate
				</Button>
			</Form>
			<div>

			</div>
		</div>
	);
}
