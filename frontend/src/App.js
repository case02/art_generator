import React from 'react';
import { Container } from "react-bootstrap"
import './App.css';
import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';

// components
import ImageUp from './components/ImageUpload';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';

// api methods
import { getIndexRoute } from './utils/api';

function App() {
	const [index, setIndex] = useState([]);

	useEffect(() => {
		try {
			getIndexRoute().then((data) => {
				setIndex(data);
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className='App'>
			<p>{index.message}</p>

			{/* SignUp Route */}
			<Container
				className='d-flex align-items-center justify-content-center'
				style={{ minHeight: '100vh' }}>
				<div className='w-100' style={{ maxWidth: '400px' }}>
					<AuthProvider>
						<Routes>
							<Route exact path='/' element={<PrivateRoute />}>
								<Route exact path='/' element={<Dashboard />} />
							</Route>
							<Route path='/signup' element={<Signup />} />
							<Route path='/login' element={<Login />} />
							<Route path='/forgot-password' element={<ForgotPassword />} />
						</Routes>
					</AuthProvider>
				</div>
			</Container>

			<br />
			<ImageUp />
		</div>
	);
}

export default App;
