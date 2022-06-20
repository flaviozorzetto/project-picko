import React, { useState } from 'react';
import Button from './components/Elements/Button/Button.js';
import Card from './components/Card/Card.js';
import Tabs from './components/Navigation/Tab/Tabs.js';
import TabPanel from './components/Navigation/Tab/TabPanel.js';
import NavBar from './components/Navigation/NavBar/NavBar.js';
import Header from './components/Elements/Header/Header.js';
import xSvg from './assets/svgs/x.svg';
import './styles/index.scss';

export default function AllComp() {
	const labels = ['Label', 'Label', 'Label'];
	const [value, setValue] = useState(0);
	const identifier = 'panel';

	return (
		<div style={{ width: '800px', margin: '1rem' }}>
			<Card
				title="Senior Ui Designer"
				status="progress"
				creationDate="February 8, 2022"
				totalCandidates="20"
				interviewsDone="12"
			/>
			<Button type="primary" size="m" content="Primary M" />
			<Button type="secondary" size="p" content="Secondary S" />
			<Button
				type="primary"
				size="m"
				content="Primary M"
				iconLeft="chevron-down"
			/>
			<Button
				type="secondary"
				size="s"
				content="Secondary S"
				iconLeft="chevron-down"
			/>
			<Button type="danger" size="m" content="Primary" iconLeft="trash-2" />
			<Button type="danger" size="s" content="Secondary S" iconLeft="trash-2" />
			<Button
				type="danger"
				size="s"
				content="Button text"
				iconLeft="chevron-down"
				iconRight="chevron-down"
			/>
			<Tabs
				identifier={identifier}
				labels={labels}
				setValue={setValue}
				value={value}
			/>
			<TabPanel identifier={identifier} value={value} index={0}>
				Item 1
			</TabPanel>
			<TabPanel identifier={identifier} value={value} index={1}>
				Item 2
			</TabPanel>
			<TabPanel identifier={identifier} value={value} index={2}>
				Item 3
			</TabPanel>
			<NavBar>
				<h2>Test</h2>
				<Tabs
					identifier={identifier}
					labels={labels}
					setValue={setValue}
					value={value}
				/>
				<h2>Test</h2>
			</NavBar>
			<Header title="Interview">
				<img src={xSvg} alt="logo" />
			</Header>
		</div>
	);
}
