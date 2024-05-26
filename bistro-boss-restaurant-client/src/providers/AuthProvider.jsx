import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import { axiosInstance } from '../components/hooks/useAxios';

export const AuthContext = createContext(null)
const auth = getAuth(app)
// -------------
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    function createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function loginUser(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function popupSignIn(provider) {
        return signInWithPopup(auth, provider)
    }
    function logOutUser() {
        return signOut(auth)
    }
    function updateUserProfile(name, photo) {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setAuthLoading(false)
            console.log('currentUser =>', currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email, uid: currentUser.uid }
                axiosInstance.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data?.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('access-token')
            }
        });
        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        setUser,
        authLoading,
        setAuthLoading,
        createUser,
        loginUser,
        popupSignIn,
        logOutUser,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;