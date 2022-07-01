import loadIcon from '../../Elements/IconLoader/icon-loader';
import Button from '../../Elements/Button/Button';
import './devInterviewModal.scss';

export default function InterviewModal(props) {
	return (
		<div className="modal__interview">
			<div className="modal__background"></div>
			<div className="modal__content">
				<header className="modal__content__header">
					<div className="modal__title">New interview</div>
					<button className="modal__close" onClick={props.closeModal}>
						{loadIcon('x')}
					</button>
					<p className="modal__description">
						Enter the name of the job position for the interview creation. Once
						created, you'll be taken to the screen where you'll choose what
						competencies will be evaluated for this job.
					</p>
				</header>
				<footer className="modal__content__footer">
					<Button
						type="secondary"
						size="m"
						content="Cancel"
						onClick={props.closeModal}
					/>
					<Button type="primary" size="m" content="Create" />
				</footer>
			</div>
		</div>
	);
}
