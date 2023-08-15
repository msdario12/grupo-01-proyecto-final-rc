import { Modal } from 'react-bootstrap';
import { NewPatientForm } from '../patients/components/NewPatientForm';

export const NewPatientPage = (props) => {
	return (
		<Modal
			onHide={props.onHide}
			show={props.show}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Body>
				<NewPatientForm modalMode={true} />
			</Modal.Body>
		</Modal>
	);
};
