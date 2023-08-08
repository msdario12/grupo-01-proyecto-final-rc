import { useEffect, useState } from 'react';
import { Badge, Button, Spinner, Table } from 'react-bootstrap';
import { CustomTh } from './CustomTh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { DeletePatientPage } from './DeletePatientPage';
import { NewPatientPage } from '../pages/NewPatientPage';
import { HeaderTitleDashboard } from '../elements/HeaderTitleDashboard';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../hooks/useAuth';
import { GenericEditPage } from '../pages/GenericEditPage';
import { UserEditForm } from './UserEditForm';
import { PetEditForm } from './PetEditForm';

const columnList = [
	{ title: 'Nombre', name: 'firstName' },
	{ title: 'Apellido', name: 'lastName' },
	{ title: 'Email', name: 'email' },
	{ title: 'Mascota', name: 'name' },
	{ title: 'Raza', name: 'race' },
	{ title: 'Especie', name: 'specie' },
	{ title: 'Acción', name: 'action', hasIcon: false, center: true },
];

export const PatientsTable = () => {
	const [patientsList, setPatientsList] = useState();
	const [sortedColumn, setSortedColumn] = useState('');
	const [selectedPatientID, setSelectedPatientID] = useState('');
	const [modalEditShow, setModalEditShow] = useState(false);
	const [modalDeleteShow, setModalDeleteShow] = useState(false);
	const [modalNewPatientShow, setModalNewPatientShow] = useState(false);
	const { privateBackendAPI } = useAxiosPrivate();
	const { auth } = useAuth();
	useEffect(() => {
		privateBackendAPI
			.get('/api/patients')
			.then((res) => {
				console.log(res.data.data);
				setPatientsList(res.data.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [modalEditShow, modalDeleteShow, modalNewPatientShow, auth]);
	if (!patientsList) {
		return (
			<div className='d-flex justify-content-center gap-3 align-items-center align-items-center'>
				<Spinner animation='border' />
				<h3>Cargando datos de pacientes</h3>
			</div>
		);
	}
	if (patientsList.length === 0) {
		return (
			<div className='d-flex justify-content-center align-items-center gap-3 flex-column'>
				<h4 className='display-6 fs-4 fw-semibold'>
					La lista de pacientes esta vacía...
				</h4>
				<div>
					<NewPatientPage
						show={modalNewPatientShow}
						setModalNewPatientShow={setModalNewPatientShow}
						onHide={() => setModalNewPatientShow(false)}
					/>
					<Button
						onClick={() => setModalNewPatientShow(true)}
						variant='primary'>
						Crear nuevo paciente
					</Button>
				</div>
			</div>
		);
	}

	return (
		<>
			<HeaderTitleDashboard
				title={'Listado de pacientes'}
				subtitle={'Edita o elimina pacientes.'}
			/>

			<GenericEditPage
				title='Edición de pacientes'
				endPoint='/api/patients/'
				selectedPatientID={selectedPatientID}
				show={modalEditShow}
				setModalEditShow={setModalEditShow}
				onHide={() => setModalEditShow(false)}>
				<UserEditForm />
				<PetEditForm />
			</GenericEditPage>
			<DeletePatientPage
				selectedPatientID={selectedPatientID}
				show={modalDeleteShow}
				setModalDeleteShow={setModalDeleteShow}
				onHide={() => setModalDeleteShow(false)}
			/>
			<NewPatientPage
				show={modalNewPatientShow}
				setModalNewPatientShow={setModalNewPatientShow}
				onHide={() => setModalNewPatientShow(false)}
			/>
			<div>
				<Button onClick={() => setModalNewPatientShow(true)} variant='primary'>
					Crear nuevo paciente
				</Button>
			</div>
			<Table hover responsive>
				<thead>
					<tr className='text-uppercase table-light align-middle'>
						<th className='text-muted small'>#</th>
						{columnList.map((header) => (
							<CustomTh
								isCenter={header.center}
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
						<tr key={patient._id} className='text-capitalize'>
							<td>{patient.index}</td>
							<td>{patient.firstName}</td>
							<td>{patient.lastName}</td>
							<td className='text-lowercase'>{patient.email}</td>
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
							<td>
								<div className='d-flex gap-2 justify-content-center'>
									<Button
										onClick={() => {
											setSelectedPatientID(patient._id);
											setModalEditShow(true);
										}}
										size='sm'
										variant='outline-success'
										style={{ width: 30 }}>
										<FontAwesomeIcon icon={faEdit} />
									</Button>

									<Button
										onClick={() => {
											setSelectedPatientID(patient._id);
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
		</>
	);
};
