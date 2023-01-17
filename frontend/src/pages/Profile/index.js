import { updateCurrentUser } from 'firebase/auth';
import React, { useState } from 'react';
import { Card, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from'../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const [error, setError] = useState('')
    const { currentUser, logout, deleteUser } = useAuth()
    const navigate = useNavigate()

    async function handleLogout(e) {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    async function handleDelete(e) {
			setError('');

			try {
				await deleteUser();
				navigate('/');
			} catch {
				setError('Failed to delete user');
			}
		}

  return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '60vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Card className='card profile-card'>
					<Card.Body>
						<h2 className='w-100 text-center mt-2'>Profile</h2>
						{error && <Alert variant='danger'>{error}</Alert>}
						<strong>Email: </strong> {currentUser.email} {currentUser.uid}
						<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
							Update Profile
						</Link>
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2'>
					<Button variant='light' onClick={handleLogout}>
						Log out
					</Button>
					{' '}
					<Button variant='light' onClick={handleDelete}>
						Delete User
					</Button>
				</div>
			</div>
		</Container>
	);
}
