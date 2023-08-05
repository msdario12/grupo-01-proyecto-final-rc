import { Modal } from 'react-bootstrap';
import { UserEditForm } from '../components/UserEditForm';
import { useContext, useEffect, useState } from 'react';
import { PetEditForm } from '../components/PetEditForm';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { ToastContext } from '../../context/ToastContext';

export const EditPatientPage = (props) => {
	const [patientData, setPatientData] = useState();
	const { privateBackendAPI } = useAxiosPrivate();
	const { addToast } = useContext(ToastContext);
	useEffect(() => {
		privateBackendAPI
			.get(`/api/patients/${props.selectedPatientID}`)
			.then((res) => {
				console.log(res.data);
				setPatientData(res.data.data);
			})
			.catch((e) => {
				console.error(e);

				addToast({
					message: 'Error al recibir los datos' + e,
					variant: 'error',
				});
			});
	}, [props.selectedPatientID]);
	if (!patientData) {
		return '';
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
				<PetEditForm petID={patientData.pet_id} />
			</Modal.Body>
		</Modal>
	);
};
