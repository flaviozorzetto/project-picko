import './Competences.scss';
import '../../../Elements/IconLoader/icon-loader';
import loadIcon from '../../../Elements/IconLoader/icon-loader';
import TextArea from '../../../TextArea/TextArea';
import Button from '../../../Elements/Button/Button';
import { getCompetencies } from '../../../Manager/Firebase';
import { useEffect, useState } from 'react';
import CompetenceAccordion from './CompetenceAccordion';

export default function Competences(props) {
	const [searchInput, setSearchInput] = useState('');
	const [stepManager, setStepManager] = useState({
		closing: false,
		step: 1,
	});
	const [firstRender, setFirstRender] = useState(true);
	const [loadingData, setLoadingData] = useState(true);
	const [competenceData, setCompetenceData] = useState();
	const [secondStepData, setSecondStepData] = useState();

	useEffect(() => {
		async function fetchData() {
			return await getCompetencies();
		}

		fetchData().then(data => {
			setCompetenceData(data);
			setLoadingData(false);
		});
	}, []);

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

	const handleCloseClick = () => {
		setStepManager({ ...stepManager, closing: true });
		const turnOffSettings = () => {
			if (stepManager.step === 1) {
				props.setCompetenceSettings(false);
			}
		};
		delayedFunction(turnOffSettings, 500).then(() => {
			setStepManager({ step: stepManager.step - 1, closing: false });
		});
	};

	return (
		<>
			<div
				className={`modal__competence__backdrop ${
					stepManager.step === 1 && stepManager.closing
						? 'modal__competence__backdrop_out'
						: ''
				}`}
			></div>
			<div
				className={`modal__competence modal__competence__container modal__competence__container_${
					stepManager.step === 1
						? stepManager.closing
							? 'mtr'
							: firstRender
							? 'rtm'
							: ''
						: stepManager.step === 2
						? stepManager.closing
							? 'ltm'
							: 'mtl'
						: ''
				}`}
			>
				<div className="modal__competence__header">
					<div
						className="modal__competence_icon_button"
						onClick={handleCloseClick}
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

				{loadingData ? (
					''
				) : (
					<CompetenceAccordion
						title={'Comunication'}
						data={competenceData.comunication}
						nextStep={data => {
							setStepManager({ ...stepManager, step: stepManager.step + 1 });
							setSecondStepData(data);
							if (firstRender === true) {
								setFirstRender(false);
							}
						}}
					/>
				)}
			</div>

			{stepManager.step === 2 && (
				<>
					<div
						className={`${
							stepManager.closing
								? 'modal__competence__backdrop modal__competence__backdrop_out'
								: 'modal__competence__backdrop'
						}`}
					></div>
					<div
						className={`modal__competence modal__competence__container modal__competence__container_rtm${
							stepManager.closing ? ' modal__competence__container_mtr' : ''
						}`}
					>
						<div className="modal__competence__header">
							<div
								className="modal__competence_icon_button"
								onClick={handleCloseClick}
							>
								{loadIcon('arrow-left', { color: '#5E626E' })}
							</div>
							<h2>Add a competence</h2>
						</div>
					</div>
				</>
			)}
		</>
	);
}
