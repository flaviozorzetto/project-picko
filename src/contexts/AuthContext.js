import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import {
	createUserDocument,
	queryUser,
} from '../components/Manager/Firebase.js';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
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
		console.log("passou aqui 01")
		try {
			// bug acontece aqui (step voltando pro default)
			let res = await auth.createUserWithEmailAndPassword(email, password);
			console.log("passou aqui 02") // voltou pro step 1
			const uid = res.user.uid;
			// debugger
			await res.user.sendEmailVerification();
			// -=---------------


			console.log("passou aqui 03")
			
			await createUserDocument({
				uid,
				...userInfo,
			});

			console.log("passou aqui 04")

			return res;
		} catch (err) {
			return { error: getCustomErrorMessage(err) };
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
			return { error: getCustomErrorMessage(err) };
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
			return { error: getCustomErrorMessage(err) };
		}
	}

	const customErrorMessages = {
		'auth/email-not-verified': {
			message: "Your email isn't verified",
			type: 'email',
			scope: 'global',
		},
		'auth/user-not-found': {
			message: 'Incorrect email or password',
			type: 'email',
			scope: 'global',
		},
		'auth/wrong-password': {
			message: 'Incorrect email or password',
			type: 'email',
			scope: 'global',
		},
		'auth/too-many-requests': {
			message: 'Too many requests with this email',
			type: 'password',
			scope: 'global',
		},
		'auth/email-already-in-use': {
			message: 'Email already exists.',
			type: 'email',
			scope: 'global',
		},
	};

	function getCustomErrorMessage(error) {
		let errorMsg = customErrorMessages[error.code];
		return errorMsg ? errorMsg : 'Failed to authenticate';
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
		getCustomErrorMessage,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
