import React from 'react';
import Signup from './routes/Signup.js';
import { AuthProvider } from './contexts/AuthContext.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './routes/Dashboard.js';
import Login from './routes/Login.js';
import PrivateRoute from './routes/PrivateRoute.js';
import ForgotPassword from './routes/ForgotPassword.js';

export default function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Routes>
						<Route exact path="/" element={<PrivateRoute />}>
							<Route exact path="/dashboard" element={<Dashboard />} />
						</Route>
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}
