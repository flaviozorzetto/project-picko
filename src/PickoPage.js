import NavBar from './components/Navigation/NavBar/NavBar';
import Tabs from './components/Navigation/Tab/Tabs';
import TabPanel from './components/Navigation/Tab/TabPanel';
import Header from './components/Elements/Header/Header';
import Button from './components/Elements/Button/Button';
import Card from './components/Card/Card';
import logo from './assets/svgs/logo.svg';
import loadIcon from './components/Elements/IconLoader/icon-loader';
import { useState } from 'react';

export default function PickoPage() {
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
					<span>Hi, William</span>
				</NavBar>
			</header>
			<main className="main">
				<section className="container">
					<TabPanel identifier={navIdentifier} value={navIndex} index={0}>
						<Header title="Interviews">
							<Button
								type="primary"
								size="m"
								content="New interview"
								iconRight="plus"
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
				</section>
			</main>
		</>
	);
}
