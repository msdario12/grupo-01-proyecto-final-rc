import { Modal } from 'react-bootstrap';
import { TurnsForm } from '../components/TurnsForm';

export const NewTurnModal = (props) => {
	return (
		<Modal
			{...props}
			size='lg'
			centered
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Body>
				<TurnsForm modalMode={false} />
			</Modal.Body>
		</Modal>
	);
};
