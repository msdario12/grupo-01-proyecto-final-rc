import { MainTableTurns } from '../components/MainTableTurns';
import { WelcomeInfo } from '../components/WelcomeInfo';

export const MainDashboard = () => {
	return (
		<div className='p-3'>
			<WelcomeInfo />
			<MainTableTurns />
		</div>
	);
};
