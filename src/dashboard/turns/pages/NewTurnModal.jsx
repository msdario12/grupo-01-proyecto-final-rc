import { Modal } from 'react-bootstrap';
import { TurnsForm } from '../components/TurnsForm';

export const NewTurnModal = (props) => {
	return (
		<Modal
			onHide={props.onHide}
			show={props.show}
			size='lg'
			centered
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Body>
				<TurnsForm
					modalMode={false}
					patientIDFromTurns={props.patientIDFromTurns}
				/>
			</Modal.Body>
		</Modal>
	);
};
