
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'
// style
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
							<Link to='/dashboard'>
								Profile
							</Link>
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
					<li>
						<Link to='/signup'>
							Sign Up
						</Link>
					</li>
				);
			}
		};

	
	return (
		<header>
			{/* <Logo /> */}
			<nav>
				<div className='nav-links'>
					<ul>
						<li>
							<Link to='/'>
								Home
							</Link>
						</li>
						{/* <li>
                            <Link> to="/about" >  
                                About
                            </Link>
                        </li> */}
						<li>
							<Link to='/'>
								Generator
							</Link>
						</li>
						{conditionalUserLink()}
					</ul>
				</div>
			</nav>
		</header>
	);
}
