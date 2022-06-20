import NavBar from './components/Navigation/NavBar/NavBar';
import Tabs from './components/Navigation/Tab/Tabs';
import TabPanel from './components/Navigation/Tab/TabPanel';
import Header from './components/Elements/Header/Header';
import Button from './components/Elements/Button/Button';
import Card from './components/Card/Card';
import logo from './assets/svgs/logo.svg';
import { useState } from 'react';

export default function PickoPage() {
	const navIdentifier = 'nav-panel';
	const navLabels = ['Interviews', 'Competences', 'Resources'];
	const [navIndex, setNavIndex] = useState(0);

	const interviewIdentifier = 'interview-panel';
	const interviewLabels = ['Active', 'Archived'];
	const [interviewIndex, setInterviewIndex] = useState(0);

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
						<TabPanel
							identifier={interviewIdentifier}
							value={interviewIndex}
							index={0}
						>
							<Card
								title="Senior Ui Designer"
								status="progress"
								creationDate="February 8, 2022"
								totalCandidates="20"
								interviewsDone="12"
							/>
							<Card
								title="IT Consultant"
								status="completed"
								creationDate="February 8, 2022"
								totalCandidates="20"
								interviewsDone="20"
							/>
							<Card
								title="Latan Marketing Manager"
								status="unitiated"
								creationDate="February 8, 2022"
								totalCandidates="20"
								interviewsDone="12"
							/>
						</TabPanel>
						<TabPanel
							identifier={interviewIdentifier}
							value={interviewIndex}
							index={1}
						>
							<Card
								title="Senior UI Designer"
								status="archived"
								creationDate="February 8, 2022"
								totalCandidates="65"
								interviewsDone="52"
							/>
							<Card
								title="Senior UI Designer"
								status="archived"
								creationDate="February 8, 2022"
								totalCandidates="12"
								interviewsDone="12"
							/>
							<Card
								title="Senior UI Designer"
								status="archived"
								creationDate="February 8, 2022"
								totalCandidates="25"
								interviewsDone="0"
							/>
						</TabPanel>
					</TabPanel>
				</section>
			</main>
		</>
	);
}
