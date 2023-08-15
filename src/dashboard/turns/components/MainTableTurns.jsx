import { useEffect, useState } from 'react';
import { Badge, Button, Spinner, Table } from 'react-bootstrap';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';
import { useAuth } from '../../../hooks/useAuth';
import { TurnStatusBadge } from '../../elements/TurnStatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { GenericEditPage } from '../../pages/GenericEditPage';
import { TurnEditPage } from '../../pages/TurnEditPage';
import { DeleteTurnPage } from '../../pages/DeleteTurnPage';
import {
	formatDateCustom,
	formatTimeCustom,
} from '../../../helpers/format-dates';
import { NewTurnModal } from '../../pages/NewTurnModal';
import { useLocation } from 'react-router-dom';
import { CustomTh } from '../../ui/components/CustomTh';

const columnList = [
	{ title: 'Fecha', name: 'date' },
	{ title: 'Hora', name: 'date', hasIcon: false },
	{ title: 'Estado', name: 'status' },
	{ title: 'Cliente', name: 'patient_id.user_id.firstName' },
	{ title: 'Mascota', name: 'patient_id.pet_id.name' },
	{ title: 'Veterinario', name: 'vet' },
	{ title: 'Detalle', name: 'details' },
	{ title: 'Acción', name: 'action', hasIcon: false, center: true },
];

export const MainTableTurns = ({ detailMode = false, patientID = '' }) => {
	const [turnsList, setTurnsList] = useState();
	const [sortedColumn, setSortedColumn] = useState('');
	const [selectedTurn, setSelectedTurn] = useState('');
	const [modalEditShow, setModalEditShow] = useState(false);
	const [modalDeleteShow, setModalDeleteShow] = useState(false);
	const { privateBackendAPI } = useAxiosPrivate();
	const [modalNewTurn, setModalNewTurn] = useState(false);
	const location = useLocation();
	const { auth } = useAuth();

	useEffect(() => {
		if (location?.state?.patient) {
			setModalNewTurn(true);
		}
	}, [location]);

	useEffect(() => {
		if (detailMode) {
			privateBackendAPI
				.get(`/api/turns?patientID=${patientID}`)
				.then((res) => {
					setTurnsList(res.data.data);
				})
				.catch((e) => {
					// eslint-disable-next-line no-console
					console.log(e);
				});
			return;
		}
		privateBackendAPI
			.get('/api/turns')
			.then((res) => {
				setTurnsList(res.data.data);
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.log(e);
			});
	}, [auth, modalEditShow, modalDeleteShow, modalNewTurn, patientID]);

	if (!turnsList) {
		return (
			<div className='d-flex justify-content-center gap-3 align-items-center align-items-center'>
				<Spinner animation='border' />
				<h3>Cargando listado de turnos</h3>
			</div>
		);
	}

	if (turnsList.length === 0) {
		return (
			<div className='d-flex justify-content-center align-items-center gap-3 flex-column'>
				<h4 className='display-6 fs-4 fw-semibold'>
					{detailMode
						? 'El paciente seleccionado no tiene turnos asignados...'
						: 'La lista de turnos esta vacía...'}
				</h4>
				<div>
					<Button onClick={() => setModalNewTurn(true)} variant='primary'>
						Crear nuevo turno
					</Button>
					<NewTurnModal
						patientIDFromTurns={patientID}
						show={modalNewTurn}
						setModalNewTurn={setModalNewTurn}
						onHide={() => setModalNewTurn(false)}
					/>
				</div>
			</div>
		);
	}

	return (
		<div>
			{selectedTurn ? (
				<div>
					<GenericEditPage
						title='Edición de turnos'
						endPoint='/api/turns/'
						selectID={selectedTurn}
						show={modalEditShow}
						setModalEditShow={setModalEditShow}
						onHide={() => setModalEditShow(false)}>
						<TurnEditPage />
					</GenericEditPage>
					<DeleteTurnPage
						selectedTurn={selectedTurn}
						show={modalDeleteShow}
						setModalDeleteShow={setModalDeleteShow}
						onHide={() => setModalDeleteShow(false)}
					/>
				</div>
			) : (
				''
			)}
			<Button
				className='mb-4'
				onClick={() => setModalNewTurn(true)}
				variant='primary'>
				Crear nuevo turno
			</Button>
			<NewTurnModal
				patientIDFromTurns={patientID}
				show={modalNewTurn}
				setModalNewTurn={setModalNewTurn}
				onHide={() => setModalNewTurn(false)}
			/>
			<Table hover responsive>
				<thead>
					<tr className='text-uppercase table-light align-middle'>
						<th className='text-muted small'>#</th>
						{columnList.map((header) => (
							<CustomTh
								idName='index'
								setSortedColumn={setSortedColumn}
								sortedColumn={sortedColumn}
								key={header.title}
								setTurnsList={setTurnsList}
								title={header.title}
								name={header.name}
								hasIcon={header.hasIcon}
							/>
						))}
					</tr>
				</thead>
				<tbody className='align-middle fw-semibold text-capitalize'>
					{turnsList.map((turn) => (
						<tr key={turn._id}>
							<td>{turn.index}</td>
							<td>{formatDateCustom(turn.date)}</td>
							<td>{formatTimeCustom(turn.date)}</td>
							<td>
								<TurnStatusBadge status={turn.status} />
							</td>
							<td>{`${turn['patient_id.user_id.firstName']} ${turn['patient_id.user_id.lastName']}`}</td>
							<td>
								<div className='d-flex flex-column align-items-start'>
									<span className=''>{turn['patient_id.pet_id.name']}</span>
									<div className=''>
										<Badge pill bg='primary'>
											{turn['patient_id.pet_id.specie']}
										</Badge>
									</div>
								</div>
							</td>
							<td>{turn.vet}</td>
							<td className='text-lowercase'>{turn.details}</td>
							<td>
								<div className='d-flex gap-2 justify-content-center'>
									<Button
										onClick={() => {
											setSelectedTurn(turn._id);
											setModalEditShow(true);
										}}
										size='sm'
										variant='outline-success'
										style={{ width: 30 }}>
										<FontAwesomeIcon icon={faEdit} />
									</Button>
									<Button
										onClick={() => {
											setSelectedTurn(turn);
											setModalDeleteShow(true);
										}}
										size='sm'
										variant='outline-danger'
										style={{ width: 30 }}>
										<FontAwesomeIcon icon={faRemove} />
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
