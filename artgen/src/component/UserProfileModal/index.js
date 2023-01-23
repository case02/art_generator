import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Modal } from 
'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UserProfileModal(show, onHide) {
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

    const deleteMessage = () => {
        return (
					<>
						<Alert vaiant='danger'>
							Are you sure you wish to delete this account?
						</Alert>
                        <div className="text-center">
                            <Button variant='primary' onClick={()=>setShowMessage(false)}>
							    Cancel
						    </Button>
                            {' '}
                            <Button variant='danger' onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
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
			{!showMessage ? (
				<Modal.Body>
					<div className='w-100' style={{ maxWidth: '400px' }}>
						{error && <Alert variant='danger'>{error}</Alert>}
						<strong>Email: </strong> {currentUser.email}
						<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
							Update Profile
						</Link>
						<div className='w-100 text-center mt-2'>
							<div>
								<Button
									variant='light'
									style={{ maxWidth: '100px' }}
									onClick={handleLogout}>
									Log out
								</Button>{' '}
								<Button
									style={{ maxWidth: '150px' }}
									variant='light'
									onClick={setShowMessage}>
									Delete User
								</Button>
							</div>
						</div>
					</div>
				</Modal.Body>
			) : (
				deleteMessage()
			)}
		</Modal>
	);
}
