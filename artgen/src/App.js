import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// firebase
import { useAuth } from './contexts/AuthContext';
import { getUserData } from './utils/api';
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
import NavBar from './component/NavBar';
import Footer from './component/Footer';


function App() {
	const { currentUser } = useAuth();
	const [userData, setUserData] = useState({});
	const [hideNav, setHideNav] = useState(false);

	useEffect(() => {
		if (currentUser){
			getUserData(currentUser)
			.then((user) => {
				setUserData(user);
			})
		}
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/generator'
					element={
						<>
							<NavBar />
							<Generator />
						</>
					}
				/>
				<Route
					path='*'
					element={
						<>
							<NavBar />
							<NotFound />
						</>
					}
				/>

				{/* Private Routes */}
				<Route exact path='/' element={<PrivateRoute />}>
					<Route
						exact
						path='/profile'
						element={
							<>
								<NavBar />
								<Profile userdata={userData} />
							</>
						}
					/>
				</Route>
				<Route exact path='/' element={<PrivateRoute />}>
					<Route
						exact
						path='/update-profile'
						element={
							<>
								<NavBar />
								<UpdateProfile />
							</>
						}
					/>
				</Route>

				{/* Signup Routes */}
				<Route
					path='/signup'
					element={
						<>
							<NavBar />
							<Signup />
						</>
					}
				/>
				<Route
					path='/login'
					element={
						<>
							<NavBar />
							<Login />
						</>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<>
							<NavBar />
							<ForgotPassword />
						</>
					}
				/>

			</Routes>
		</div>
	);
}

export default App;
