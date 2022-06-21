import './Button.scss';
import loadIcon from '../IconLoader/icon-loader.js';

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
					{props.iconLeft && loadIcon(props.iconLeft, svgProps)}
					<span>{props.content}</span>
					{props.iconRight && loadIcon(props.iconRight, svgProps)}
				</div>
			) : (
				<span>{props.content}</span>
			)}
		</button>
	);
}
