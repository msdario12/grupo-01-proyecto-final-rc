import { Card } from 'react-bootstrap';
import { Title } from './Title';

export const WelcomeInfoCard = ({ children }) => {
	return (
		<Card className='h-100 border-0 bg-light rounded-0 shadow-sm '>
			<Card.Body className='d-flex flex-column justify-content-between'>
				{children}
			</Card.Body>
		</Card>
	);
};

WelcomeInfoCard.Title = Title
