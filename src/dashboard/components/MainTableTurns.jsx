import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clippingParents } from '@popperjs/core';
import { useEffect, useState } from 'react';
import { Badge, Table } from 'react-bootstrap';

const turnsListObject = [
	{
		id: 1,
		date: '07/07/23',
		time: '15:55',
		customer: 'Lucia Miranda',
		pet: 'Roque',
		veterinarian: 'Juarez',
		detail: 'Desparasitación y limpieza bucal',
		animalType: 'Perro',
	},
	{
		id: 2,
		date: '06/07/23',
		time: '12:30',
		customer: 'Carlos Ramirez',
		pet: 'Max',
		veterinarian: 'González',
		detail: 'Vacunación anual',
		animalType: 'Perro',
	},
	{
		id: 3,
		date: '10/07/23',
		time: '09:15',
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
		customer: 'Pedro Gómez',
		pet: 'Simba',
		veterinarian: 'Pérez',
		detail: 'Corte de uñas',
		animalType: 'Gato',
	},
	{
		id: 5,
		date: '14/07/23',
		time: '14:00',
		customer: 'Laura Fernández',
		pet: 'Bella',
		veterinarian: 'Rodríguez',
		detail: 'Esterilización',
		animalType: 'Perro',
	},
];

export const CustomTh = ({ title, name, setTurnsList }) => {
	const [sortMode, setSortMode] = useState('original');

	const switchSortMode = () => {
		if (sortMode === 'original') {
			setSortMode('descend');
			return;
		}
		if (sortMode === 'descend') {
			setSortMode('ascend');
			return;
		}
		if (sortMode === 'ascend') {
			setSortMode('original');
			return;
		}
	};

	const comparingFunction = (a, b, name) => {
		const nameA = a[name].toUpperCase(); // ignore upper and lowercase
		const nameB = b[name].toUpperCase(); // ignore upper and lowercase

		if (nameA < nameB) {
			return sortMode === 'original' ? -1 : 1;
		}
		if (nameA > nameB) {
			return sortMode === 'original' ? 1 : -1;
		}
		// names must be equal
		return 0;
	};
	const sortByName = (name) => {
		switchSortMode();

		if (sortMode === 'ascend') {
			setTurnsList((prev) =>
				[...prev].sort((a, b) => comparingFunction(a, b, 'id'))
			);
			return;
		}
		console.log('Ordenando por ', name);

		setTurnsList((prev) =>
			[...prev].sort((a, b) => comparingFunction(a, b, name))
		);
	};
	return (
		<th className='text-muted small'>
			<div className='d-flex'>
				<span className='me-2'>{title}</span>
				<a href='#' className='text-decoration-none text-dark'>
					<FontAwesomeIcon icon={faSort} onClick={() => sortByName(name)} />
				</a>
			</div>
		</th>
	);
};

export const MainTableTurns = () => {
	const [turnsList, setTurnsList] = useState([]);
	useEffect(() => {
		setTurnsList(turnsListObject);
	}, []);
	if (!turnsList) {
		return 'Cargando datos...';
	}
	return (
		<Table hover>
			<thead>
				<tr className='text-uppercase table-light align-middle'>
					<th className='text-muted small'>#</th>
					<CustomTh setTurnsList={setTurnsList} title={'Fecha'} name={'date'} />
					<CustomTh setTurnsList={setTurnsList} title={'Hora'} name={'time'} />
					<CustomTh
						setTurnsList={setTurnsList}
						title={'Cliente'}
						name={'customer'}
					/>
					<th className='text-muted small'>Mascota</th>
					<th className='text-muted small'>Veterinario</th>
					<th className='text-muted small'>Detalle</th>
				</tr>
			</thead>
			<tbody className='align-middle fw-semibold'>
				{turnsList.map((turn) => (
					<tr key={turn.id}>
						<td>{turn.id}</td>
						<td>{turn.date}</td>
						<td>{turn.time}</td>
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
