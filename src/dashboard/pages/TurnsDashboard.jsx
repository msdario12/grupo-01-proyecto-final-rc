import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { MainTableTurns } from '../components/MainTableTurns';
import { HeaderTitleDashboard } from '../elements/HeaderTitleDashboard';

export const TurnsDashboard = ({ title }) => {
	useDocumentTitle(title);
	return (
		<div className='d-flex flex-column gap-4'>
			<HeaderTitleDashboard
				title={'Listado de turnos'}
				subtitle={
					'Acá aparecen todos los turnos que se encuentran registrados en el sistema'
				}
			/>
			<MainTableTurns />
		</div>
	);
};
