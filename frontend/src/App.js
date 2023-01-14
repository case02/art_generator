import React from 'react';
import { Container } from "react-bootstrap"
import './App.css';
import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home'
import ImageUp from './pages/ImageUpload';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
//components
import PrivateRoute from './component/PrivateRoute';
import Nav from './component/Nav';
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

			{/* Routes */}
			<Container
				className='d-flex align-items-center justify-content-center'
				style={{ minHeight: '100vh' }}>
				<div className='w-100' style={{ maxWidth: '400px' }}>
					<AuthProvider>
						<Nav />
						<Routes>
							{/* Private Routes */}
							<Route path='/' element={<Home />} />
							<Route exact path='/profile' element={<PrivateRoute />}>
								<Route exact path='/profile' element={<Dashboard />} />
							</Route>
							<Route exact path='/' element={<PrivateRoute />}>
								<Route
									exact
									path='/update-profile'
									element={<UpdateProfile />}
								/>
							</Route>

							{/* Signup Routes */}
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
