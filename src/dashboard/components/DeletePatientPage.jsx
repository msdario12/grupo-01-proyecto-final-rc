import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { formatDateCustom, formatTimeCustom } from '../../helpers/format-dates';
import { useAuth } from '../../hooks/useAuth';

export const DeletePatientPage = (props) => {
	const [patientData, setPatientData] = useState();
	const { addToast } = useContext(ToastContext);
	const [isLoading, setIsLoading] = useState(false);
	const { privateBackendAPI } = useAxiosPrivate();
	const { auth } = useAuth();

	useEffect(() => {
		privateBackendAPI
			.get(`/api/patients/${props.selectedPatientID}?populate=true`)
			.then((res) => {
				setPatientData(res.data.data);
			});
		return () => {
			setPatientData();
		};
	}, [props.show, auth]);
	const handleCancelModal = () => {
		props.setModalDeleteShow(false);
	};
	const handleDeletePatient = () => {
		setIsLoading(true);
		privateBackendAPI
			.delete(`/api/patients/${props.selectedPatientID}`)
			.then((res) => {
				console.log(res);
				addToast({
					message: 'Paciente eliminado correctamente',
					variant: 'success',
				});

				setIsLoading(false);
				props.setModalDeleteShow(false);
			})
			.catch((e) => {
				setIsLoading(false);
				addToast({
					message: 'Error al eliminar el paciente - ' + e,
					variant: 'error',
				});
			});
	};

	return (
		<Modal
			onHide={props.onHide}
			show={props.show}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<FontAwesomeIcon icon={faWarning} color='red' />
					<span className='ms-3'>Eliminar un paciente</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{patientData?.user_id ? (
					<Row>
						<Col className='border-end'>
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
						</Col>
						<Col>
							{patientData.turns.length === 0 ? (
								<div className='d-flex align-items-center justify-content-center h-100'>
									El paciente no tiene turnos
								</div>
							) : (
								<div className='d-flex flex-column h-100'>
									<span className='fw-bold'>Listado de turnos</span>
									<ul>
										{patientData.turns.map((turn) => (
											<li key={turn._id}>
												<span>{formatDateCustom(turn.date)} - </span>
												<span>{formatTimeCustom(turn.date)} - </span>
												<span className='text-capitalize'>{turn.vet}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</Col>
					</Row>
				) : (
					<div className='d-flex justify-content-center gap-3 align-items-center'>
						<Spinner animation='border' size='md' />
						<span>Cargando paciente</span>
					</div>
				)}
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
