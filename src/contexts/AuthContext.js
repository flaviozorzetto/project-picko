import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { useValidation } from "./ValidationContext.js";
import {
	createUserDocument,
	queryUser,
} from '../components/Manager/Firebase.js';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const { validate } = useValidation();
	
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	async function signup(signupObj) {
		const userInfo = {
			firstName: signupObj['first-name'].value,
			lastName: signupObj['last-name'].value,
			email: signupObj['email'].value,
			password: signupObj['password'].value,
			companyName: signupObj['company-name'].value,
			jobRole: signupObj['job-role'].value,
		};

		const { firstName, lastName, email, password, companyName, jobRole } =
			userInfo;

		try {
			let res = await auth.createUserWithEmailAndPassword(email, password);
			const uid = res.user.uid;
			await res.user.sendEmailVerification();

			await createUserDocument({
				uid,
				...userInfo,
			});

			return res;
		} catch (err) {
			return { error: validate(err.code) };
		}
	}

	async function login(email, password) {
		try {
			let res = await auth.signInWithEmailAndPassword(email, password);
			if (!res.user.emailVerified) {
				let error = new Error("The email is not verified");
				error.code = 'auth/email-not-verified';
				throw error;
			}
			return res;
		} catch (err) {
			return { error: validate(err.code) };
		}
	}

	function logout() {
		return auth.signOut();
	}

	async function resetPassword(email) {
		try {
			let res = await auth.sendPasswordResetEmail(email);
			return res;
		} catch (err) {
			return { error: validate(err.code) };
		}
	}

	useEffect(() => {
		auth.onAuthStateChanged(async user => {
			setLoading(true);
			if (!user) {
				setCurrentUser(null);
			} else {
				const userInfo = await queryUser(user.uid);
				setCurrentUser(userInfo);
			}
			setLoading(false);
		});
	}, []);

	const value = {
		currentUser,
		login,
		logout,
		signup,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
