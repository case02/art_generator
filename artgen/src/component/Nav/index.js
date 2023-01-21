
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'
// style
import artgen from '../../images/GenArt.png';
import './style.css';

export default function Nav(props) {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('');

    // logout user function
    async function handleLogout(e) {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    // if user is logged in or logged out show...
    const conditionalUserLink = () => {
			if (currentUser) {
				return (
					<>
						<li>
							<Link to='/generator'>Get Started</Link>
						</li>
						<li>
							<Link to='/profile'>Profile</Link>
						</li>
						<li>
							<Link onClick={handleLogout} to='/'>
								Log Out
							</Link>
						</li>
					</>
				);
			} else {
				return (
					<>
						<li>
							<Link to='/signup'>Sign Up</Link>
						</li>
						<li>
							<Link to='/login'>Log in</Link>
						</li>
					</>
					
				);
			}
		};

	
	return (
		<header className='nav-head'>
			<nav className='navbar'>
				<div className='nav-links'>
					<ul>
						{conditionalUserLink()}
					</ul>
				</div>
			</nav>
		</header>
	);
}
