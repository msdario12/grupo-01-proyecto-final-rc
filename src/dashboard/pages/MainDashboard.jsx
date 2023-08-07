import { useAuth } from '../../hooks/useAuth';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { MainTableTurns } from '../components/MainTableTurns';
import { WelcomeInfo } from '../components/WelcomeInfo';

export const MainDashboard = ({ title }) => {
	useDocumentTitle(title);
	const { auth } = useAuth();
	return (
		<div>
			<div className='mt-1 mt-md-2 mt-lg-4'>
				<h2 style={{ letterSpacing: 0.1 }} className='display-4 fw-bold'>
					Bienvenido de vuelta{' '}
					<span className='px-2 text-bg-secondary text-light'>
						{auth?.firstName}
					</span>
				</h2>
				<h4 className='display-6 fs-4'>
					Esto son los principales datos de hoy:
				</h4>
			</div>
			<WelcomeInfo />
			<MainTableTurns />
		</div>
	);
};
