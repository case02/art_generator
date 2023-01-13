import React, { useContext, useEffect, useState } from 'react'
import "firebase/auth"
import { auth } from '../firebase'

const AuthContext = React.createContext()

// function to allow the use of context
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // use auth module from firebase.js to login user
    function signup(email, password) {
        // return promise of succesful login, can be used to return error
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // request user from firebase and logs in if user exists
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // logout current user
    function logout() {
        return auth.signOut()
    }

    // reset password
    function resetPassword(email) {
			return auth.sendPasswordResetEmail(email);
		}


    //set current user on mount
    useEffect(() => {
        // firebase method to take in user and set current user 
        // unsubscribe from on off change event when done
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
        })

        // unsubscribe from auth.onAuthChanged listener whenever we unmount component
        return unsubscribe
    }, [])
     
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
