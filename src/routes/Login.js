import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';

import { useValidation } from '../contexts/ValidationContext.js';

import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form.js';
import TextArea from '../components/TextArea/TextArea.js';
import Button from '../components/Elements/Button/Button.js';
import './Login.scss';
import logo from '../assets/svgs/logo.svg';

export default function Login() {
	const { inputs, addNewInput } = useValidation();
	
	const [state, setStates] = useState({
		email: { value: '', type: '', message: '', step: 1 },
		password: { value: '', type: '', message: '', step: 1 },
	});

	useEffect(() => {
		addNewInput(state);
	}, [state])

	const [error, setError] = useState('');

	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = event => {
		let stateName = event.target.name;

		setStates((prev) => ({
			...prev,
			[stateName]: {
				value: event.target.value,
				message: inputs[stateName].message,
				type: event.target.type,
				step: state[stateName].step,
			},
		}));
	};


	async function handleSubmit(e) {
		e.preventDefault();
		setError('');

		setLoading(true);
		const res = await login(state.email.value, state.password.value);

		if (res && res.error) {
			let customError = res.error;
			setError(customError);
		} else {
			navigate('/dashboard');
		}
		setLoading(false);
	}

	return (
		<>
			<div className="login-page">
				<div className="login-container">
					<img src={logo} className="logo" alt="logo"/>

					<Form id="login-form" onSubmit={handleSubmit} error={error}>
						<TextArea
							onChange={handleChange}
							required={true}
							type="email"
							name="email"
							disabled={false}
							globalError={!(!error.message)}
						>
							Email
						</TextArea>
						<TextArea
							onChange={handleChange}
							required={true}
							type="password"
							name="password"
							disabled={false}
							globalError={!(!error.message)}
						>
							Password
						</TextArea>

						<Button
							content="Continue"
							theme="primary"
							size="b"
							full={true}
							disabled={loading}
						/>
					</Form>

					<div className="redirect-container">
						<span>
							No accounting? Sign up <Link to="/signup">here</Link>.
						</span>
						<span className="forgot-password-link">
							<Link to="/forgot-password">Forgot your password?</Link>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
