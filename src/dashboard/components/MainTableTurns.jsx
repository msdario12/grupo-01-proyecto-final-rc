import { Badge, Table } from 'react-bootstrap';

const turnsList = [
	{
		date: '07/07/23',
		time: '15:55',
		customer: 'Lucia Miranda',
		pet: 'Roque',
		veterinarian: 'Juarez',
		detail: 'Desparasitación y limpieza bucal',
	},
	{
		date: '06/07/23',
		time: '12:30',
		customer: 'Carlos Ramirez',
		pet: 'Max',
		veterinarian: 'González',
		detail: 'Vacunación anual',
	},
	{
		date: '10/07/23',
		time: '09:15',
		customer: 'Ana Martínez',
		pet: 'Luna',
		veterinarian: 'Sánchez',
		detail: 'Revisión general',
	},
	{
		date: '03/07/23',
		time: '17:20',
		customer: 'Pedro Gómez',
		pet: 'Simba',
		veterinarian: 'Pérez',
		detail: 'Corte de uñas',
	},
	{
		date: '14/07/23',
		time: '14:00',
		customer: 'Laura Fernández',
		pet: 'Bella',
		veterinarian: 'Rodríguez',
		detail: 'Esterilización',
	},
];

export const MainTableTurns = () => {
	return (
		<Table hover>
			<thead>
				<tr className='text-uppercase table-light align-middle'>
					<th className='text-muted small'>#</th>
					<th className='text-muted small'>Fecha</th>
					<th className='text-muted small'>Hora</th>
					<th className='text-muted small'>Cliente</th>
					<th className='text-muted small'>Mascota</th>
					<th className='text-muted small'>Veterinario</th>
					<th className='text-muted small'>Detalle</th>
				</tr>
			</thead>
			<tbody className='align-middle fw-semibold'>
				{turnsList.map((turn) => (
					<tr key={turn.pet + turn.name}>
						<td>1</td>
						<td>{turn.date}</td>
						<td>{turn.time}</td>
						<td>{turn.customer}</td>
						<td>
							<div className='d-flex flex-column align-items-start'>
								<span className=''>{turn.pet}</span>
								<div className=''>
									<Badge pill bg='primary'>
										Perro
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
