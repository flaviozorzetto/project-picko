// import { useState } from 'react';
// import Button from './components/Elements/Button/Button';
// import AllComp from './AllComp';
// import PickoPage from './PickoPage';
// import './styles/index.scss';

// export default function App() {
// 	const [displayComp, setDisplayComp] = useState(false);
// 	return (
// 		<>
// 			{displayComp ? <AllComp /> : <PickoPage />}
// 			<Button
// 				type="primary"
// 				size="m"
// 				onClick={() => {
// 					setDisplayComp(!displayComp);
// 				}}
// 				content={displayComp ? 'Change to App' : 'Change to All Comps'}
// 			/>
// 		</>
// 	);
// }

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
			<div style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Routes>
							<Route exact path="/" element={<PrivateRoute />}>
								<Route exact path="/" element={<Dashboard />} />
							</Route>
							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
						</Routes>
					</AuthProvider>
				</Router>
			</div>
		</>
	);
}
