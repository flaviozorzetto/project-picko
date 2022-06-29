import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Elements/Button/Button.js';
import Card from '../components/Card/Card.js';
import Form from '../components/Form/Form.js';
import TextArea from '../components/TextArea/TextArea.js';
import Checkbox from '../components/Checkbox/Checkbox.js';

import '../styles/index.scss';

export default function Dashboard() {
	const [authError, setAuthError] = useState('');
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		setAuthError('');

		try {
			await logout();
			navigate('/login');
		} catch {
			setAuthError('Failed to log out');
		}
	}

	return (
		<>
			<div style={{ width: '1000px', margin: '1rem' }}>
				<Card
					title="Senior UI Designer"
					status="progress"
					creationDate="February 8, 2022"
					totalCandidates="20"
					interviewsDone="12"
				/>
				<Button type="primary" size="s">
					Primary
				</Button>

				<Form>
					<TextArea
						iconLeft="search"
						iconRight="chevron-down"
						required={true}
						type="email"
						name="email"
						placeholder="Placeholder"
						disabled={true}
					>
						Label
					</TextArea>
					<TextArea
						iconLeft="search"
						required={true}
						type="password"
						name="password"
						placeholder="Placeholder"
						disabled={false}
					>
						Label
					</TextArea>
					{/* 
          <Checkbox type="checkbox" name="checkbox" placeholder="Enter password" disabled={true} />
          <Checkbox type="checkbox" name="checkbox" placeholder="Enter password" disabled={true} />
          <Checkbox type="checkbox" name="checkbox" placeholder="Enter password" disabled={false} />
          <Checkbox type="checkbox" name="checkbox" placeholder="Enter password" disabled={false} /> */}
					<Checkbox
						type="checkbox"
						name="checkbox"
						placeholder="Enter password"
						disabled={false}
						checked={true}
					/>

					<Button type="primary" size="s">
						Login
					</Button>
				</Form>

				<Form
					disabled={false}
					type="checkbox"
					name="check1"
					error={false}
				></Form>
			</div>

			<div>
				<h2>Profile</h2>
				<span>Email:</span> {currentUser.email}
			</div>

			<div>
				{authError && <span>{authError}</span>}
				<button onClick={handleLogout}>Log out</button>
			</div>
			<div>Dashboard</div>
		</>
	);
}
