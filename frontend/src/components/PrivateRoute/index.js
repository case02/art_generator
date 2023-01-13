import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PrivateRoute() {

    const { currentUser } = useAuth()

  return (
		// If authorized, return an outlet that will render child elements
		// If not, return element that will navigate to login page
		currentUser ? <Outlet /> : <Navigate to='/login' />
	);
}
