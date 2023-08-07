import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { MainTableTurns } from '../components/MainTableTurns';
import { TurnsForm } from '../components/TurnsForm';

export const TurnsDashboard = ({ title }) => {
	useDocumentTitle(title);
	return (
		<div>
			<h2>TurnsDashboard</h2>
			<TurnsForm />
			<MainTableTurns />
		</div>
	);
};
