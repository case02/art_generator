import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
//firestore
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase';

export default function Signup() {
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [userExists, setUserExists] = useState(false)
	const navigate = useNavigate();

	// handles
	async function handleSubmit(e) {
		// prevent form from refreshing
		e.preventDefault();

		// check if password and confirmPassword share the same value, give error if not
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			// return, to exit function and not proceed with sign in
			return setError('Passwords do not match');
		}
		try {
			const res = await signup(
				emailRef.current.value,
				passwordRef.current.value
			);
			await setDoc(doc(db, 'users', res.user.uid), {
				username: usernameRef.current.value,
				email: emailRef.current.value,
				uploadedImages: [],
				savedImages: []
			})
			navigate('/');
		} catch (error){
			console.log(error)
		}
		setUserExists(true);
		setLoading(false);
	}


	return (
		<Container
			className='container d-flex align-items-center justify-content-center'
			style={{ minHeight: '60vh' }}>
			{!userExists ? (
				<div className='w-100' style={{ maxWidth: '400px' }}>
					<Card className='card signup-card'>
						<Card.Body>
							<h2 className='w-100 text-center mt-2'>Sign Up</h2>

							{error && <Alert variant='danger'>{error}</Alert>}
							<Form onSubmit={handleSubmit}>
								<Form.Group id='username'>
									<Form.Label>Username</Form.Label>
									<Form.Control type='text' ref={usernameRef} required />
								</Form.Group>
								<Form.Group id='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control type='email' ref={emailRef} required />
								</Form.Group>
								<Form.Group id='password'>
									<Form.Label>Password</Form.Label>
									<Form.Control type='password' ref={passwordRef} required />
								</Form.Group>
								<Form.Group id='password-confirm'>
									<Form.Label>Password Confirmation</Form.Label>
									<Form.Control
										type='password'
										ref={passwordConfirmRef}
										required
									/>
								</Form.Group>
								<br />
								<Button disabled={loading} className='w-100' type='submit'>
									Sign Up
								</Button>
							</Form>
						</Card.Body>
					</Card>
					<div className='w-100 text-center mt-2'>
						Already have an account? <Link to='/login'>Log In</Link>
					</div>
				</div>
			) : (
				<div>
					<p>You are already signed in as</p>
					{currentUser.email}
				</div>
			)}
		</Container>
	);
}
