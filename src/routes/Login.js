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
	const { validate } = useValidation();

	const [state, setStates] = useState({
		email: { value: '' },
		password: { value: '' },
	});

	const [error, setError] = useState('');

	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = event => {
		let stateName = event.target.name;

		setStates({
			...state,
			[stateName]: { value: event.target.value },
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		setLoading(true);

		const res = await login(state.email.value, state.password.value);

		if ((res && res.error)) {
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

					<Form onSubmit={handleSubmit} error={error}>
						<TextArea
							onChange={handleChange}
							required={true}
							type="email"
							name="email"
							disabled={false}
							error={error}
						>
							Email
						</TextArea>
						<TextArea
							onChange={handleChange}
							required={true}
							type="password"
							name="password"
							disabled={false}
							error={error}
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
					<span>
						No accounting? Sign up <Link to="/signup">here</Link>
					</span>
					<span>
						<Link to="/forgot-password">Forgot your password?</Link>
					</span>
				</div>
			</div>
		</>
	);
}
