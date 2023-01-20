import { updateCurrentUser } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Modal } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useAuth } from'../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import UserImages from '../../component/UserImages';
import UserProfileModal from '../../component/UserProfileModal';

export default function Profile({userData}) {
	const [modalShow, setModalShow] = React.useState(false);

  return (
		<>
		<div>
			<MDBIcon
				fas
				icon='user-circle'
				size='3x'
				onClick={() => setModalShow(true)}
			/>
			<br />
			{userData.username}
		</div>
			<UserProfileModal
				userData={userData}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>

			<UserImages />
		</>
	);
}
