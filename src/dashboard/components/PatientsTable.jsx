import { useEffect, useState } from 'react';
import { MainTableTurns } from './MainTableTurns';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge, Table } from 'react-bootstrap';
import { CustomTh } from './CustomTh';
import { backendAPI } from '../../api/backendAPI';

const columnList = [
	{ title: 'Nombre', name: 'firstName' },
	{ title: 'Apellido', name: 'lastName' },
	{ title: 'Email', name: 'email' },
	{ title: 'Mascota', name: 'name' },
	{ title: 'Raza', name: 'race' },
	{ title: 'Especie', name: 'specie' },
];

export const PatientsTable = () => {
	const [patientsList, setPatientsList] = useState([]);
	const [sortedColumn, setSortedColumn] = useState('');
	useEffect(() => {
		backendAPI.get('/api/patients').then((res) => {
			console.log(res.data.data);
			setPatientsList(res.data.data);
		});
	}, []);
	if (!patientsList) {
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
							idName='index'
							setSortedColumn={setSortedColumn}
							sortedColumn={sortedColumn}
							key={header.title}
							setTurnsList={setPatientsList}
							title={header.title}
							name={header.name}
							hasIcon={header.hasIcon}
						/>
					))}
				</tr>
			</thead>
			<tbody className='align-middle fw-semibold'>
				{patientsList.map((patient) => (
					<tr key={patient._id}>
						<td>{patient.index}</td>
						<td>{patient.firstName}</td>
						<td>{patient.lastName}</td>
						<td>{patient.email}</td>
						<td>
							<div className='d-flex flex-column align-items-start'>
								<span className=''>{patient.name}</span>
							</div>
						</td>
						<td>{patient.race}</td>
						<td>
							<Badge pill bg='primary'>
								{patient.specie}
							</Badge>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
