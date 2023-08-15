import { useParams } from 'react-router';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../../hooks/useAxiosPrivate';
import { HeaderTitleDashboard } from '../../elements/HeaderTitleDashboard';
import { useAuth } from '../../../hooks/useAuth';
import { MainTableTurns } from '../../turns/components/MainTableTurns';

export const PatientDetailPage = ({ title }) => {
	useDocumentTitle(title);
	const params = useParams();
	const { privateBackendAPI } = useAxiosPrivate();
	const [patientData, setPatientData] = useState();
	const { auth } = useAuth();

	useEffect(() => {
		privateBackendAPI
			.get(`/api/patients/${params.id}?populate=true`)
			.then((res) => {
				setPatientData(res.data.data);
			});
	}, [params, privateBackendAPI, auth]);
	if (!patientData) {
		return 'Cargando datos';
	}
	return (
		<div className='d-flex gap-4 flex-column'>
			<HeaderTitleDashboard
				title={
					'Detalles del paciente: ' +
					patientData.pet_id.name.at(0).toUpperCase() +
					patientData.pet_id.name.slice(1)
				}
				subtitle={patientData.pet_id.specie}
			/>
			<h2 className='display-6 fs-3 fw-bold'>Datos del dueño</h2>
			<div>
				<div className='d-flex align-items-baseline gap-4'>
					<h2 className='display-6 fs-4'>Nombre:</h2>
					<span className='fw-bold display-5 fs-4 text-capitalize'>
						{patientData.user_id.firstName}
					</span>
				</div>
				<div className='d-flex align-items-baseline gap-4'>
					<h2 className='display-6 fs-4'>Apellido:</h2>
					<span className='fw-bold display-5 fs-4 text-capitalize'>
						{patientData.user_id.lastName}
					</span>
				</div>
				<div className='d-flex align-items-baseline gap-4'>
					<h2 className='display-6 fs-4'>Email:</h2>
					<span className='fw-bold display-5 fs-4'>
						{patientData.user_id.email}
					</span>
				</div>
				<div className='d-flex align-items-baseline gap-4'>
					<h2 className='display-6 fs-4'>Teléfono:</h2>
					<span className='fw-bold display-5 fs-4'>
						{patientData.user_id.phone}
					</span>
				</div>
			</div>
			<h2 className='display-6 fs-3 fw-bold'>Turnos del paciente</h2>
			<MainTableTurns detailMode={true} patientID={params.id} />
		</div>
	);
};
