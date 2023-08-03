import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const TurnsDashboard = ({ title }) => {
	useDocumentTitle(title);
	return (
		<div>
			<h2>TurnsDashboard</h2>
		</div>
	);
};
