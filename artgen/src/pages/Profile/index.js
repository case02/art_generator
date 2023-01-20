import { updateCurrentUser } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Modal } from 'react-bootstrap';
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useAuth } from'../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import UserImages from '../../component/UserImages';
import UserProfileModal from '../../component/UserProfileModal';

export default function Profile({userdata}) {
	const [modalShow, setModalShow] = React.useState(false);

  return (
		<>
			<div className='mt-5 profile-icon text-center bg-image hover-zoom'>
				<div>
					<MDBIcon
						fas
						floating
						icon='user-circle'
						size='7x'
						onClick={() => setModalShow(true)}
					/>
					<br />
					{userdata.username}
				</div>
			</div>
			<UserProfileModal
				userData={userdata}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>

			<UserImages />
		</>
	);
}
