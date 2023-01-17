import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		// prevent form from refreshing
		e.preventDefault();

		// check if password and confirmPassword share the same value, give error if not
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			// return, to exit function and not proceed with sign in
			return setError('Passwords do not match');
		}
		
		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch {
			if (passwordRef.current.value.length < 6) {
				setError('Pasword must be longer than 6 characters');
			} else {setError('Failed to create an account');}
		}
		setLoading(false);
	}

	return (
		<Container
			className='container d-flex align-items-center justify-content-center'
			style={{ minHeight: '60vh' }}>
			{!currentUser ? (
				<div className='w-100' style={{ maxWidth: '400px' }}>
					<Card className='card signup-card'>
						<Card.Body>
							<h2 className='w-100 text-center mt-2'>Sign Up</h2>

							{error && <Alert variant='danger'>{error}</Alert>}
							<Form onSubmit={handleSubmit}>
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
