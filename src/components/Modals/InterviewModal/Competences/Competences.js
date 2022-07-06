import './Competences.scss';
import '../../../Elements/IconLoader/icon-loader';
import loadIcon from '../../../Elements/IconLoader/icon-loader';
import TextArea from '../../../TextArea/TextArea';
import { useState } from 'react';
import Button from '../../../Elements/Button/Button';

export default function Competences(props) {
	const [searchInput, setSearchInput] = useState('');
	const [stepManager, setStepManager] = useState({
		mode: 'frontward',
		closing: false,
		step: 1,
	});

	// const [closeManager, setCloseManager] = useState({
	// 	step: stepManager.step,
	// 	closing: false,
	// });

	const handleSearchInput = e => {
		setSearchInput(e.target.value);
	};

	const delayedFunction = (func, time) => {
		return new Promise((res, rej) => {
			setTimeout(() => {
				func();
				res();
			}, time);
		});
	};

	const handleCloseClick = step => {
		setStepManager({ mode: 'backward', step: step - 1, closing: true });
		const turnOffSettings = () => {
			if (step === 1) {
				props.setCompetenceSettings(false);
			}
		};
		delayedFunction(turnOffSettings, 500).then(() => {
			setStepManager({ mode: 'backward', step: step - 1, closing: false });
		});
	};

	return (
		<>
			<div className="modal__competence__backdrop"></div>
			<div
				className={`modal__competence modal__competence__container${
					stepManager.step === 0
						? ' modal__competence__container_mtr'
						: stepManager.step === 1 && stepManager.mode === 'backward'
						? ' modal__competence__container_ltm'
						: ''
				}${stepManager.step === 2 ? ' modal__competence__container_mtl' : ''}`}
			>
				<div className="modal__competence__header">
					<div
						className="modal__competence_icon_button"
						onClick={() => {
							handleCloseClick(stepManager.step);
						}}
					>
						{loadIcon('x', { color: '#5E626E' })}
					</div>
					<h2>Add a competence</h2>
				</div>
				<div className="modal__competence_textarea_placeholder">
					<TextArea
						value={searchInput}
						onChange={handleSearchInput}
						iconLeft="search"
						placeholder="Search by name"
					/>
				</div>
				<Button
					content="Next"
					theme="primary"
					size="b"
					onClick={() => {
						setStepManager({ ...stepManager, mode: 'frontward', step: 2 });
					}}
				/>
			</div>
			{stepManager.step === 2 && (
				<div className="modal__competence__backdrop"></div>
			)}
			{(stepManager.step === 2 || (stepManager.step === 1 && stepManager.closing === true)) && (
				<div
					className={`modal__competence modal__competence__container${
						stepManager.step === 1 && stepManager.closing
							? ' modal__competence__container_mtr'
							: ''
					}`}
				>
					<Button
						content="Back"
						theme="primary"
						size="b"
						onClick={() => {
							handleCloseClick(stepManager.step);
						}}
					/>
				</div>
			)}
		</>
	);
}
