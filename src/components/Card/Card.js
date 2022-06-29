import './Card.scss';
import Badge from '../Elements/Badge/Badge';

export default function Card(props) {

	return (
		<div className="card">
			<div className="card__content">
				<div className="card__content__main">
					<span className="card__title">{props.title}</span>
					<Badge type={props.status} />
				</div>
				<div className="card__content__details">
					<p>
						Creation date: <span>{props.creationDate}</span>
					</p>
				</div>
			</div>
			<div className="card__status">
				<div>
					<span className="card__status__title">{props.totalCandidates}</span>
					<p className="card__status__subtitle">Candidates</p>
				</div>
				<div>
					<span className="card__status__title">{props.interviewsDone}</span>
					<p className="card__status__subtitle">Interviews done</p>
				</div>
			</div>
		</div>
	);
}
