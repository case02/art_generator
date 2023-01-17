import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// pages
import Home from './pages/Home'
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Generator from './pages/Generator';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import UpdateProfile from './pages/UpdateProfile';
//components
import PrivateRoute from './component/PrivateRoute';
import Nav from './component/Nav';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
// api 
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
			{/* <p>{index.message}</p> */}
			<NavBar />
			<Footer />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/generator' element={<Generator />} />
				<Route path='*' element={<NotFound />} />

				{/* Private Routes */}
				<Route exact path='/profile' element={<PrivateRoute />}>
					<Route exact path='/profile' element={<Profile />} />
				</Route>
				<Route exact path='/' element={<PrivateRoute />}>
					<Route exact path='/update-profile' element={<UpdateProfile />} />
				</Route>

				{/* Signup Routes */}
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</div>
	);
}

export default App;
