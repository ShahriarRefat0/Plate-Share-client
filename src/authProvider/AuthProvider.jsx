import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { GoogleAuthProvider } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
   const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
   }

  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

   const loginWithPass = (email, password) => {
     return signInWithEmailAndPassword(auth, email, password)
   }

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
   }
   
   const logOutUser = () => {
    return signOut(auth);
   }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
       setLoading(false); 
    })
    return () => {
      unsubscribe()
    }
},[])

  const authInfo = {
    user,
    setUser,
    createUser,
    loginWithGoogle,
    logOutUser,
    loginWithPass,
    updateUser,
    loading,
    };

  
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;