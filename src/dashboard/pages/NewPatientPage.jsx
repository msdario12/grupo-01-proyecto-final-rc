import { Modal } from 'react-bootstrap';
import { NewPatientForm } from '../components/NewPatientForm';

export const NewPatientPage = (props) => {
	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter'>
			
			<Modal.Body>
				<NewPatientForm modalMode={true} />
			</Modal.Body>
		</Modal>
	);
};
