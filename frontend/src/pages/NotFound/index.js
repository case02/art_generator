import { Button } from 'react-bootstrap';
import oops from '../../images/Oops.png';
import './style.css';

export default function NotFound() {
	return (
		<div className='container'>
			<img
				alt='oops!'
				className='logo'
				style={{ maxWidth: '500px' }}
				src={oops}
			/>
			<h3>404 - PAGE NOT FOUND</h3>
			<p style={{ maxWidth: '350px' }}>
				The page you are looking for might have been removed had its name
				changed or is temporarily unavailable.
			</p>
			<Button href='/' variant='primary' size='lg' active>
				GO TO HOMEPAGE
			</Button>
		</div>
	);
}
