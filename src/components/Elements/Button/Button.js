import './Button.scss';
import parse from 'html-react-parser';
import feather from 'feather-icons';

export default function Button(props) {
	const svgProps = {
		width: props.size === 'm' ? 24 : 16,
		height: props.size === 'm' ? 24 : 16,
		'stroke-width': 1.5,
	};

	return (
		<button
			onClick={props.onClick}
			className={`button_${props.type} button_${props.type}_${props.size}`}
		>
			{props.iconLeft || props.iconRight ? (
				<div className="button__content">
					{props.iconLeft &&
						parse(feather.icons[props.iconLeft].toSvg(svgProps))}
					<span>{props.content}</span>
					{props.iconRight &&
						parse(feather.icons[props.iconRight].toSvg(svgProps))}
				</div>
			) : (
				<span>{props.content}</span>
			)}
		</button>
	);
}
