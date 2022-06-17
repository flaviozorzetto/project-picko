import React, { useContext, useState, useEffect  } from 'react'
import { auth } from "../firebase.js"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
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

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  const customErrorMessages = {
    "auth/user-not-found": "User not found",
  }

  function getCustomErrorMessage(error) {
    let errorMsg = customErrorMessages[error.code]

    return errorMsg
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
