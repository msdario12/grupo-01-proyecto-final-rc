import format from 'date-fns/format';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Badge, Button, Spinner, Table } from 'react-bootstrap';
import { CustomTh } from './CustomTh';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import { TurnStatusBadge } from '../elements/TurnStatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { GenericEditPage } from '../pages/GenericEditPage';
import { TurnsForm } from './TurnsForm';
import { TurnEditPage } from '../pages/TurnEditPage';

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

export const MainTableTurns = () => {
	const [turnsList, setTurnsList] = useState([]);
	const [sortedColumn, setSortedColumn] = useState('');
	const [selectedTurn, setSelectedTurn] = useState('');
	const [modalEditShow, setModalEditShow] = useState(false);
	const [modalDeleteShow, setModalDeleteShow] = useState(false);
	const { privateBackendAPI } = useAxiosPrivate();
	const { auth } = useAuth();

	useEffect(() => {
		privateBackendAPI
			.get('/api/turns')
			.then((res) => {
				console.log(res.data.data);
				setTurnsList(res.data.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [auth, modalEditShow]);

	const formatDate = (date) => {
		const obj = new Date(date);
		return format(obj, 'P', { locale: es });
	};
	const formatTime = (date) => {
		const obj = new Date(date);
		return format(obj, 'p', { locale: es });
	};

	if (!turnsList) {
		return (
			<div className='d-flex justify-content-center gap-3 align-items-center align-items-center'>
				<Spinner animation='border' />
				<h3>Cargando listado de turnos</h3>
			</div>
		);
	}

	return (
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
				<tbody className='align-middle fw-semibold'>
					{turnsList.map((turn) => (
						<tr key={turn._id}>
							<td>{turn.index}</td>
							<td>{formatDate(turn.date)}</td>
							<td>{formatTime(turn.date)}</td>
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
							<td>{turn.details}</td>
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
											setSelectedTurn(turn._id);
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
