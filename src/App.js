import { useState } from 'react';
import Button from './components/Elements/Button/Button';
import AllComp from './AllComp';
import PickoPage from './PickoPage';
import './styles/index.scss';

export default function App() {
	const [displayComp, setDisplayComp] = useState(false);
	return (
		<>
			{displayComp ? <AllComp /> : <PickoPage />}
			<Button
				type="primary"
				size="m"
				onClick={() => {
					setDisplayComp(!displayComp);
				}}
				content={displayComp ? 'Change to App' : 'Change to All Comps'}
			/>
		</>
	);
}
