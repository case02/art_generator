import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import artgen from '../../images/GenArt.png';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './style.css'

function NavBar() {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState('');

	// logout user function
	async function handleLogout(e) {
		setError('');

		try {
			await logout();
			navigate('/login');
		} catch {
			setError('Failed to log out');
		}
        navigate('/')
	}

	// if user is logged in or logged out show...
	const conditionalUserLink = () => {
		if (currentUser) {
			return (
                <>
                    <Nav.Link href='/profile'>Profile</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </>
			);
		} else {
			return <Nav.Link href='/signup'>Sign Up</Nav.Link>
		}
	};

	return (
		<Navbar
			bg='dark'
			variant='dark'
			expand='sm'
			className='mb-0 color-nav'>
			<Container fluid>
				<Navbar.Brand href='/'>
					<img
						alt='A.G'
						className='ml-0 logo'
						style={{ maxWidth: '50px' }}
						src={artgen}
					/>
					{/* AUGMENT */}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`}/>
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-sm`}
					aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
					placement='end'>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
							Art Generator
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className='justify-content-end flex-grow-1 pe-3'>
							<Nav.Link href='/'>Home</Nav.Link>
							<Nav.Link href='/generator'>Generator</Nav.Link>
							{conditionalUserLink()}
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}

export default NavBar;
