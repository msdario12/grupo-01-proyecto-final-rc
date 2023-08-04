import { Button } from 'react-bootstrap';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { MainTableTurns } from '../components/MainTableTurns';
import { WelcomeInfo } from '../components/WelcomeInfo';
import { backendAPI } from '../../api/backendAPI';

export const MainDashboard = ({ title }) => {
	useDocumentTitle(title);
	const handleTest = () => {
		backendAPI.get('/api/turns').then((res) => console.log('Enviado'));
	};
	return (
		<div>
			<div className='mt-1 mt-md-2 mt-lg-4'>
				<Button onClick={handleTest}>Test mensaje</Button>
				<h2 style={{ letterSpacing: 0.1 }} className='display-4 fw-bold'>
					Bienvenido de vuelta{' '}
					<span className='px-2 text-bg-secondary text-light'>Otto!</span>
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
