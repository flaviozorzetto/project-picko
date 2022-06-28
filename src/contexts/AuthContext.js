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
      await res.user.sendEmailVerification();

      return res;
    } catch(err) {
      return {error: getCustomErrorMessage(err)};
    }
  }

  async function login(email, password) {
    try {
      let res = await auth.signInWithEmailAndPassword(email, password)
      if(!res.user.emailVerified) {
        throw new Error("auth/email-not-verified");
      }

      return res;
    } catch(err) {
      return {error: getCustomErrorMessage(err)};
    }
  }

  function logout() {
    return auth.signOut();
  }

  async function resetPassword(email) {
    try {
      let res = await auth.sendPasswordResetEmail(email)
      return res;
    } catch(err) {
      return {error: getCustomErrorMessage(err)};
    }
  }

  const customErrorMessages = {
    "auth/email-not-verified": {
      "message": "Your email isn't verified",
      "type": "email",
      "scope": "global"
    },
    "auth/user-not-found": {
      "message": "You have entered an invalid username or password",
      "type": "email",
      "scope": "global"
    },
    "auth/wrong-password": {
      "message": "You have entered an invalid username or password",
      "type": "email",
      "scope": "global"
    },
    "auth/too-many-requests": {
      "message": "Too many requests with this email. Please wait.",
      "type": "password",
      "scope": "global"
    },
    "auth/email-already-in-use": {
      "message": "Email already exists.",
      "type": "email",
      "scope": "global"
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