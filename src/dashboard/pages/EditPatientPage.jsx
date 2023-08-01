import { Button, Modal } from 'react-bootstrap';
import { NewPatientForm } from '../components/NewPatientForm';

export const EditPatientPage = (props) => {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Edición de pacientes
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<NewPatientForm
					editMode={true}
					selectedPatientID={props.selectedPatientID}
				/>
			</Modal.Body>
		</Modal>
	);
};
