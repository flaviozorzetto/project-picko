import './Button.scss';
import loadIcon from '../IconLoader/icon-loader';

export default function Button(props) {
	const svgProps = {
		width: props.size === 'm' || props.size === 'b' ? 24 : 16,
		height: props.size === 'm' || props.size === 'b' ? 24 : 16,
		'stroke-width': 1.3,
	};

	return (
		<button
			form={props.form}
			type={props.type}
			onClick={props.onClick}
			className={`button_${props.theme} button_${props.theme}_${props.size}${
				props.full ? ' button_full' : ''
			}`}
			disabled={props.disabled ? props.disabled : null}
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
