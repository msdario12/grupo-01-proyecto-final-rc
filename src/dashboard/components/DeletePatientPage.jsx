import { Button, Modal, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';

export const DeletePatientPage = (props) => {
	const [patientData, setPatientData] = useState();
	const { addToast } = useContext(ToastContext);
	const [isLoading, setIsLoading] = useState(false);
	const { privateBackendAPI } = useAxiosPrivate();

	useEffect(() => {
		privateBackendAPI
			.get(`/api/patients/${props.selectedPatientID}?populate=true`)
			.then((res) => {
				setPatientData(res.data.data);
			});
	}, [props]);
	const handleCancelModal = () => {
		props.setModalDeleteShow(false);
	};
	const handleDeletePatient = () => {
		setIsLoading(true);
		privateBackendAPI
			.delete(`/api/patients/${props.selectedPatientID}`)
			.then((res) => {
				console.log(res.data);
				addToast({
					message: 'Paciente eliminado correctamente',
					variant: 'success',
				});
				setIsLoading(false);
				props.setModalDeleteShow(false);
			})
			.catch((e) => {
				console.error(e);
				setIsLoading(false);
				addToast({
					message: 'Error al eliminar el paciente - ' + e,
					variant: 'error',
				});
			});
	};
	if (!patientData || !patientData.user_id) {
		return;
	}
	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<FontAwesomeIcon icon={faWarning} color='red' />
					<span className='ms-3'>Eliminar un paciente</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<span className='fw-bold'>Dueño: </span>
					<span className='text-capitalize'>{`${patientData.user_id.firstName} ${patientData.user_id.lastName}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Email: </span>
					<span className='text-text-lowercase'>{`${patientData.user_id.email}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Nombre de la mascota: </span>
					<span className='text-capitalize'>{`${patientData.pet_id.name}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Especie: </span>
					<span className='text-capitalize'>{`${patientData.pet_id.specie}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Raza: </span>
					<span className='text-capitalize'>{`${patientData.pet_id.race}`}</span>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='danger'
					disabled={isLoading}
					onClick={handleDeletePatient}>
					{isLoading ? (
						<div>
							<Spinner
								as='span'
								animation='border'
								size='sm'
								role='status'
								aria-hidden='true'
							/>
							<span className='ms-2'>Cargando</span>
						</div>
					) : (
						'Eliminar paciente'
					)}
				</Button>
				<Button
					variant='secondary'
					disabled={isLoading}
					onClick={handleCancelModal}>
					Cancelar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
