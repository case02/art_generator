import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

	async function handleSubmit(e) {
		// prevent form from refreshing
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
            navigate('/')
		} catch (error){
			const message = error.message.replace('Firebase:', '')
			setError(message);
		}
		setLoading(false);
	}

	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '60vh' }}>
			{!currentUser ? 	
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Card className='card signup-card'>
					<Card.Body>
						<h2 className='w-100 text-center mt-2'>Log In</h2>
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
							<br />
							<Button disabled={loading} className='w-100' type='submit'>
								Log In
							</Button>
						</Form>
						<div className='w-100 text-center mt-3'>
							<Link to='/forgot-password'>Forgot Password?</Link>
						</div>
					</Card.Body>
				</Card> 
				<div className='w-100 text-center mt-2'>
					Need an account? <Link to='/signup'>Sign Up</Link>
				</div> 
			</div> : <div><p>You are already signed in as</p>{currentUser.email}</div>}
		</Container>
	);
}
