import './Badge.scss';

export default function Badge(props) {
	const returnTextType = type => {
		if (type === 'progress') {
			return {
				class: type,
				text: 'In progress',
			};
		} else if (type === 'completed') {
			return {
				class: type,
				text: 'Completed',
			};
		} else if (type === 'unitiated') {
			return {
				class: type,
				text: 'Not initiated',
			};
		} else if (type === 'archived') {
			return {
				class: type,
				text: 'Archived',
			};
		}
	};

	const typeObj = returnTextType(props.type);

	return <div className={`badge badge_${typeObj.class}`}>{typeObj.text}</div>;
}
