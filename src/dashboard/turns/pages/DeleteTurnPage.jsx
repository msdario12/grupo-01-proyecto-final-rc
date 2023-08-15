import { Button, Modal, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ToastContext } from '../../../context/ToastContext';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';
import {
	formatDateCustom,
	formatTimeCustom,
} from '../../../helpers/format-dates';
import { TurnStatusBadge } from '../../elements/TurnStatusBadge';

export const DeleteTurnPage = (props) => {
	const [turnData, setTurnData] = useState();
	const { addToast } = useContext(ToastContext);
	const [isLoading, setIsLoading] = useState(false);
	const { privateBackendAPI } = useAxiosPrivate();

	useEffect(() => {
		if (props.selectedTurn) {
			setTurnData(props.selectedTurn);
		}
	}, [props.selectedTurn]);
	const handleCancelModal = () => {
		props.setModalDeleteShow(false);
	};
	const handleDeletePatient = () => {
		setIsLoading(true);
		privateBackendAPI
			.delete(`/api/turns/${props.selectedTurn._id}`)
			.then(() => {
				addToast({
					message: 'Turno eliminado correctamente',
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
	if (!turnData?.date) {
		return '';
	}
	return (
		<Modal
			onHide={props.onHide}
			show={props.show}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					<FontAwesomeIcon icon={faWarning} color='red' />
					<span className='ms-3'>Eliminar un turno</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<span className='fw-bold'>Fecha: </span>
					<span className='text-capitalize'>{`${formatDateCustom(
						turnData.date
					)}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Hora: </span>
					<span className='text-capitalize'>{`${formatTimeCustom(
						turnData.date
					)}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Estado: </span>
					<span className='text-capitalize'>
						<TurnStatusBadge status={turnData.status} />
					</span>
				</div>
				<div>
					<span className='fw-bold'>Detalle: </span>
					<span className='text-capitalize'>{`${turnData.details}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Dueño: </span>
					<span className='text-capitalize'>{`${turnData['patient_id.user_id.firstName']} ${turnData['patient_id.user_id.lastName']}`}</span>
				</div>
				<div>
					<span className='fw-bold'>Mascota: </span>
					<span className='text-capitalize'>{`${turnData['patient_id.pet_id.name']}`}</span>
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
						'Eliminar turno'
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
