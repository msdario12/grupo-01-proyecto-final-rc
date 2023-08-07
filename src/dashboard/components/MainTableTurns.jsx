import format from 'date-fns/format';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import { CustomTh } from './CustomTh';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';

const columnList = [
	{ title: 'Fecha', name: 'dateObj' },
	{ title: 'Hora', name: 'dateObj', hasIcon: false },
	{ title: 'Cliente', name: 'customer' },
	{ title: 'Mascota', name: 'pet' },
	{ title: 'Veterinario', name: 'veterinarian' },
	{ title: 'Detalle', name: 'detail' },
];

export const MainTableTurns = () => {
	const [turnsList, setTurnsList] = useState([]);
	const [sortedColumn, setSortedColumn] = useState('');
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
	}, [auth]);

	if (!turnsList) {
		return 'Cargando datos...';
	}
	const formatDate = (date) => {
		const obj = new Date(date);
		return format(obj, 'P', { locale: es });
	};
	const formatTime = (date) => {
		const obj = new Date(date);
		return format(obj, 'p', { locale: es });
	};
	return (
		<Table hover responsive>
			<thead>
				<tr className='text-uppercase table-light align-middle'>
					<th className='text-muted small'>#</th>
					{columnList.map((header) => (
						<CustomTh
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
					</tr>
				))}
			</tbody>
		</Table>
	);
};
