import React, { useContext, useEffect, useState } from 'react'
import "firebase/auth"
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'; 

const AuthContext = React.createContext()

// function to allow the use of context
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // use auth module from firebase.js to login user
    function signup( email, password ) {
        // return promise of succesful login, can be used to return error
        return auth.createUserWithEmailAndPassword(email, password)
    }

    // add user to db with image 
    function addUserData(username, email) {
			// return promise of succesful login, can be used to return error
			return setDoc(doc(db, 'users', currentUser.uid), {
				username: username,
				email: email,
			});
		}

    // request user from firebase and logs in if user exists
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    // logout current user
    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
			return auth.sendPasswordResetEmail(email);
		}
    
    function updateEmail(email) {
                return currentUser.updateEmail(email);
            }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function deleteUser(){
        return currentUser.delete()
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
        resetPassword,
        updateEmail,
        updatePassword,
        deleteUser
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
