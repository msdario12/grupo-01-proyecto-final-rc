import { Modal } from 'react-bootstrap';
import { UserEditForm } from '../components/UserEditForm';
import { backendAPI } from '../../api/backendAPI';
import { useEffect, useState } from 'react';
import { CustomToast } from '../components/CustomToast';

export const EditPatientPage = (props) => {
	const [patientData, setPatientData] = useState();
	useEffect(() => {
		backendAPI.get(`/api/patients/${props.selectedPatientID}`).then((res) => {
			console.log(res.data);
			setPatientData(res.data.data);
		});
	}, [props.selectedPatientID]);
	if (!patientData) {
		return 'Cargando datos...';
	}
	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Edición de pacientes
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* <NewPatientForm
					editMode={true}
					selectedPatientID={props.selectedPatientID}
				/> */}
				
				<UserEditForm userID={patientData.user_id} />
			</Modal.Body>
		</Modal>
	);
};
