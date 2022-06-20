import React, { useContext, useState, useEffect  } from 'react'
import { auth } from "../firebase.js"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    try {
      let res = await auth.createUserWithEmailAndPassword(email, password)
      return res;
    } catch(err) {
      return {error: err};
    }

    // return auth.createUserWithEmailAndPassword(email, password)
  }

  async function login(email, password) {
    try {
      let res = await auth.signInWithEmailAndPassword(email, password)
      return res;
    } catch(err) {
      return {error: err};
    }

    // return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut();
  }

  async function resetPassword(email) {
    try {
      let res = await auth.sendPasswordResetEmail(email)
      return res;
    } catch(err) {
      return {error: err};
    }
  }

  const customErrorMessages = {
    "auth/user-not-found": {
      "message": "User not found",
      "type": "email"
    },
    "auth/wrong-password": {
      "message": "Wrong password",
      "type": "password"
    },
    "auth/too-many-requests": {
      "message": "Too many requests",
      "type": "password"
    },
    "auth/email-already-in-use": {
      "message": "Email already exists",
      "type": "email"
    },
  }

  function getCustomErrorMessage(error) {
    let errorMsg = customErrorMessages[error.code]

    return errorMsg ? errorMsg : "Failed to authenticate"
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    signup,
    resetPassword,
    getCustomErrorMessage
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
