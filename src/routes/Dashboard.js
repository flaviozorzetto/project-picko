import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';

// Components import
import NavBar from '../components/Navigation/NavBar/NavBar';
import Tabs from '../components/Navigation/Tab/Tabs';
import TabPanel from '../components/Navigation/Tab/TabPanel';
import Header from '../components/Elements/Header/Header';
import Button from '../components/Elements/Button/Button';
import Card from '../components/Card/Card';
import logo from '../assets/svgs/logo.svg';
import loadIcon from '../components/Elements/IconLoader/icon-loader';
import InterviewModal from '../components/Modals/InterviewModal/InterviewModal.js';
import Form from '../components/Form/Form.js';
import TextArea from '../components/TextArea/TextArea.js';
import Checkbox from '../components/Checkbox/Checkbox.js';

import '../styles/index.scss';

export default function Dashboard() {
	const [authError, setAuthError] = useState('');
	const { currentUser, logout } = useAuth();
	const userInfo = currentUser.data;
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

	const navIdentifier = 'nav-panel';
	const navLabels = ['Interviews', 'Competences', 'Resources'];
	const [navIndex, setNavIndex] = useState(0);

	const interviewIdentifier = 'interview-panel';
	const interviewLabels = ['Active', 'Archived'];
	const [interviewIndex, setInterviewIndex] = useState(0);

	const [filterValue, setFilterValue] = useState('');
	const filterRegex = new RegExp(filterValue, 'gi');
	const cards = [
		<Card
			title="Senior UI Designer"
			status="progress"
			creationDate="February 8, 2022"
			totalCandidates="20"
			interviewsDone="12"
		/>,
		<Card
			title="IT Consultant"
			status="completed"
			creationDate="February 8, 2022"
			totalCandidates="20"
			interviewsDone="20"
		/>,
		<Card
			title="Latan Marketing Manager"
			status="unitiated"
			creationDate="February 8, 2022"
			totalCandidates="20"
			interviewsDone="12"
		/>,
		<Card
			title="Senior UI Designer"
			status="archived"
			creationDate="February 8, 2022"
			totalCandidates="65"
			interviewsDone="52"
		/>,
		<Card
			title="Senior UI Designer"
			status="archived"
			creationDate="February 8, 2022"
			totalCandidates="12"
			interviewsDone="12"
		/>,
		<Card
			title="Senior UI Designer"
			status="archived"
			creationDate="February 8, 2022"
			totalCandidates="25"
			interviewsDone="0"
		/>,
		<Card
			title="Senior UI Designer"
			status="archived"
			creationDate="February 8, 2022"
			totalCandidates="25"
			interviewsDone="0"
		/>,
	].filter(card => {
		return card.props.title.match(filterRegex) ? true : false;
	});

	const archivedCards = cards.filter(card => card.props.status === 'archived');
	const activeCards = cards.filter(card => card.props.status !== 'archived');

	const [newInterview, setNewInterview] = useState(false);

	return (
		<>
			<header>
				<NavBar>
					<img src={logo} alt="logo picko" />
					<Tabs
						identifier={navIdentifier}
						labels={navLabels}
						value={navIndex}
						setValue={setNavIndex}
					/>
					<span>
						Hi, <span className="capitalize-first">{userInfo.firstName}</span>
					</span>
				</NavBar>
			</header>
			<main className="main">
				<section className="container">
					<TabPanel identifier={navIdentifier} value={navIndex} index={0}>
						<Header title="Interviews">
							<Button
								theme="primary"
								size="m"
								content="New interview"
								iconRight="plus"
								onClick={() => {
									setNewInterview(true);
								}}
							/>
						</Header>
						<Tabs
							identifier={interviewIdentifier}
							labels={interviewLabels}
							value={interviewIndex}
							setValue={setInterviewIndex}
						/>
						<div className="filter-bar">
							{loadIcon('search')}
							<input
								type="text"
								placeholder="Search for an interview"
								value={filterValue}
								onChange={event => {
									setFilterValue(event.target.value);
								}}
							/>
						</div>
						<TabPanel
							identifier={interviewIdentifier}
							value={interviewIndex}
							index={0}
						>
							<div className="filter-info" hidden={filterValue ? false : true}>
								<span className="bolder-info">{activeCards.length}</span> result
								was found with the term{' '}
								<span className="bolder-info">"{filterValue}"</span>
							</div>
							<ul className="interview__list">
								{activeCards.map((element, index) => (
									<li className="interview__list__item" key={index}>
										{element}
									</li>
								))}
							</ul>
						</TabPanel>
						<TabPanel
							identifier={interviewIdentifier}
							value={interviewIndex}
							index={1}
						>
							<div className="filter-info" hidden={filterValue ? false : true}>
								<span className="bolder-info">{archivedCards.length}</span>{' '}
								result was found with the term{' '}
								<span className="bolder-info">"{filterValue}"</span>
							</div>
							<ul className="interview__list">
								{archivedCards.map((element, index) => (
									<li className="interview__list__item" key={index}>
										{element}
									</li>
								))}
							</ul>
						</TabPanel>
					</TabPanel>
					<Button
						content="Logout"
						size="b"
						theme="primary"
						onClick={handleLogout}
					/>
				</section>
				{newInterview && (
					<InterviewModal
						closeModal={() => {
							setNewInterview(false);
						}}
					/>
				)}
			</main>
		</>
	);
}
