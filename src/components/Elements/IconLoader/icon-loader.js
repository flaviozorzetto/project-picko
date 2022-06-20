import parse from 'html-react-parser';
import feather from 'feather-icons';

export default function loadIcon(name, args) {
	return parse(
		feather.icons[name].toSvg(args ? args : { width: 24, height: 24 })
	);
}
