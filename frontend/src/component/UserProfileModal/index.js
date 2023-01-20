import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Modal } from 
'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UserProfileModal(show, onHide, userData) {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { currentUser, logout, deleteUser } = useAuth();
    const [showMessage, setShowMessage] = useState(false);
    // const user = userData
    // console.log('this is the user', userData.username)
     async function handleLogout(e) {
        setError('');

        try {
            await logout();
            navigate('/login');
        } catch {
            setError('Failed to log out');
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

    const DeleteMessage = () => {

        return (
					<>
						<Alert vaiant='danger'>
							Are you sure you wish to delete this account?
						</Alert>
						<Button variant='primary' onClick={setShowMessage(false)}>
							Cancel
						</Button>
						<Button variant='danger' onClick={handleDelete}>
							Delete
						</Button>
					</>
				);
    }

  return (
		<Modal
			{...show}
			{...onHide}
			size='sm'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Profile</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='w-100' style={{ maxWidth: '400px' }}>
					{error && <Alert variant='danger'>{error}</Alert>}
					<strong>Email: </strong> {currentUser.email} {currentUser.uid}
					<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
						Update Profile
					</Link>
					<div className='w-100 text-center mt-2'>
                        {!showMessage ?
                            <div>
                                <Button variant='light' onClick={handleLogout}>
                                    Log out
                                </Button> 
                                {' '}
                                <Button variant='light' onClick={setShowMessage(true)}>
                                    Delete User
                                </Button> 
                            </div>
                            
                        : <DeleteMessage /> }
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
