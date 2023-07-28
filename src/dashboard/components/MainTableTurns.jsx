import format from 'date-fns/format';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';
import { CustomTh } from './CustomTh';

const turnsListObject = [
	{
		id: 1,
		date: '07/07/23',
		time: '15:55',
		dateObj: new Date('02/07/23 15:55:00'),
		customer: 'Analia Miranda',
		pet: 'Roque',
		veterinarian: 'Alvarez',
		detail: 'Desparasitación y limpieza bucal',
		animalType: 'Perro',
	},
	{
		id: 2,
		date: '06/07/23',
		time: '12:30',
		dateObj: new Date('07/04/23 02:55:00'),
		customer: 'Pedro Ramirez',
		pet: 'Max',
		veterinarian: 'Ziddane',
		detail: 'Vacunación anual',
		animalType: 'Perro',
	},
	{
		id: 3,
		date: '10/07/23',
		time: '09:15',
		dateObj: new Date('03/01/23 16:55:00'),
		customer: 'Ana Martínez',
		pet: 'Luna',
		veterinarian: 'Sánchez',
		detail: 'Revisión general',
		animalType: 'Gato',
	},
	{
		id: 4,
		date: '03/07/23',
		time: '17:20',
		dateObj: new Date('02/05/23 19:55:00'),
		customer: 'Lucas Gómez',
		pet: 'Simba',
		veterinarian: 'Pérez',
		detail: 'Corte de uñas',
		animalType: 'Gato',
	},
	{
		id: 5,
		date: '14/07/23',
		time: '14:00',
		dateObj: new Date('12/04/23 22:55:00'),
		customer: 'Guido Fernández',
		pet: 'Bella',
		veterinarian: 'Rodríguez',
		detail: 'Esterilización',
		animalType: 'Perro',
	},
];

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
	useEffect(() => {
		setTurnsList(turnsListObject);
	}, []);
	if (!turnsList) {
		return 'Cargando datos...';
	}
	const formatDate = (date) => {
		return format(date, 'P', { locale: es });
	};
	const formatTime = (date) => {
		return format(date, 'p', { locale: es });
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
					<tr key={turn.id}>
						<td>{turn.id}</td>
						<td>{formatDate(turn.dateObj)}</td>
						<td>{formatTime(turn.dateObj)}</td>
						<td>{turn.customer}</td>
						<td>
							<div className='d-flex flex-column align-items-start'>
								<span className=''>{turn.pet}</span>
								<div className=''>
									<Badge pill bg='primary'>
										{turn.animalType}
									</Badge>
								</div>
							</div>
						</td>
						<td>{turn.veterinarian}</td>
						<td>{turn.detail}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
