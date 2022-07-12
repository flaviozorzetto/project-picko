import { useState } from 'react';
import loadIcon from '../../../Elements/IconLoader/icon-loader';

export default function CompetenceAccordion(props) {
	const [open, setOpen] = useState(false);

	return (
		<div className="competence__accordion">
			<div
				className="competence__accordion__container"
				onClick={() => {
					setOpen(!open);
				}}
			>
				<span className="competence__accordion__title">{props.title}</span>
				{loadIcon(`${open ? 'minus' : 'plus'}`, {
					color: '#26272C',
					class: 'competence__accordion__icon',
				})}
			</div>
			{open &&
				Object.entries(props.data).map((competence, index) => {
					const title = competence[0];
					const competenceInfo = competence[1];
					return (
						<div
							className={`competence__accordion__content`}
							key={index}
							onClick={() => {
								props.nextStep(competence[1]);
							}}
						>
							<div>
								<span className="competence__accordion__content__title">
									{title}
								</span>
								<p className="competence__accordion__content__description">
									{competenceInfo.description}
								</p>
							</div>
							{loadIcon('chevron-right', {
								color: '#26272C',
								class: 'competence__accordion__icon',
							})}
						</div>
					);
				})}
		</div>
	);
}
