import loadIcon from '../../Elements/IconLoader/icon-loader';
import Button from '../../Elements/Button/Button';
import Header from '../../Elements/Header/Header';
import Footer from '../../Elements/Footer/Footer';
import './InterviewModal.scss';
import TextArea from '../../TextArea/TextArea';
import { useState } from 'react';

export default function InterviewModal(props) {
	const [step, setStep] = useState(1);
	const [jobTitle, setJobTitle] = useState('');

	const handleChange = e => {
		setJobTitle(e.target.value);
	};

	return (
		<div className="modal__interview">
			<Header title="New interview settings">
				<button className="modal__icon" onClick={props.closeModal}>
					{loadIcon('x')}
				</button>
			</Header>
			<main className="modal__main">
				<div className="modal__info">
					<span className="modal__info__step">Step {step} of 2</span>
					{step === 1 && <h3 className="modal__info__title">New Interview</h3>}
					<p className="modal__info__paragraph">
						{step === 1
							? `Enter the name of the job position for the interview creation. Once
						created, you'll be taken to the screen where you'll choose what
						competencies will be evaluated for this job.`
							: `Add competencies you would like to evaluate in the candidates. 
						For each competence, you will see some levels and questions that will help you during the interview to hire the best person for the job.`}
					</p>
					{step === 1 && (
						<TextArea
							placeholder="Placeholder"
							value={jobTitle}
							onChange={handleChange}
						>
							Job title
						</TextArea>
					)}
				</div>
			</main>
			<Footer>
				{step === 1 ? (
					<>
						<Button
							theme="secondary"
							content="Cancel"
							size="m"
							onClick={props.closeModal}
						/>
						<Button
							theme="primary"
							content="Create"
							size="m"
							onClick={() => {
								setStep(step + 1);
							}}
							disabled={jobTitle.length === 0}
						/>
					</>
				) : null}
			</Footer>
		</div>
	);
}
