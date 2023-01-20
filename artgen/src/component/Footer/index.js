import React from 'react';
import {
	MDBFooter,
	MDBContainer,
	MDBCol,
	MDBRow,
	MDBIcon,
	MDBBtn,
} from 'mdb-react-ui-kit';
import './style.css'

export default function App() {
	return (
		<MDBFooter className=' footer bg-light text-center text-white media-shrink'>
			<MDBContainer fluid className='p-1 pb-0 ' style={{ maxHeight: '50px' }}>
				<section className='m-0'>
					<MDBBtn
						style={{ backgroundColor: '#0082ca' }}
						floating
						className='m-1'
						href='https://www.linkedin.com/in/caseystocker/'
						target='blank'
						role='button'
						size='sm'>
						<MDBIcon fab icon='linkedin-in' size='sm' />
					</MDBBtn>

					<MDBBtn
						style={{ backgroundColor: '#333333' }}
						floating
						className='m-1'
						href='https://github.com/case02'
						target='blank'
						role='button'
						size='sm'>
						<MDBIcon fab icon='github' size='sm' />
					</MDBBtn>
				</section>
			</MDBContainer>

			<div
				className='text-center p-1 media-hidden'
				style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
				<p className='m-0'>
					This site was greatly inspired by external coders. Feel free to use,
					add on and share your changes through the github link above.
				</p>
			</div>
		</MDBFooter>
	);
}
