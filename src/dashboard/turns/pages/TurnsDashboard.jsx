import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { HeaderTitleDashboard } from '../../elements/HeaderTitleDashboard';
import { MainTableTurns } from '../components/MainTableTurns';

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
