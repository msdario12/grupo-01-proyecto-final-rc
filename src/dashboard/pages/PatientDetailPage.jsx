import { useParams } from 'react-router';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { HeaderTitleDashboard } from '../elements/HeaderTitleDashboard';

export const PatientDetailPage = ({ title }) => {
	useDocumentTitle(title);
	const params = useParams();
	const { privateBackendAPI } = useAxiosPrivate();
	const [patientData, setPatientData] = useState();

	useEffect(() => {
		privateBackendAPI
			.get(`/api/patients/${params.id}?populate=true`)
			.then((res) => {
				setPatientData(res.data.data);
				console.log(res);
			});
	}, [params, privateBackendAPI]);
	if (!patientData) {
		return 'Cargando datos';
	}
	return (
		<div>
			<HeaderTitleDashboard
				title={patientData.pet_id.name}
				subtitle={patientData.pet_id.specie}
			/>
			<div className='d-flex align-items-baseline gap-4'>
				<h2 className='display-6 fs-4'>Nombre:</h2>
				<span className='fw-bold display-5 fs-4'>Fulano</span>
			</div>
			<div className='d-flex align-items-baseline gap-4'>
				<h2 className='display-6 fs-4'>Apellido:</h2>
				<span className='fw-bold display-5 fs-4'>Martinez</span>
			</div>
			<div className='d-flex align-items-baseline gap-4'>
				<h2 className='display-6 fs-4'>Email:</h2>
				<span className='fw-bold display-5 fs-4'>dares@gmail.com</span>
			</div>
			<div className='d-flex align-items-baseline gap-4'>
				<h2 className='display-6 fs-4'>Teléfono:</h2>
				<span className='fw-bold display-5 fs-4'>3816351651</span>
			</div>
			<p>{patientData.user_id.firstName}</p>
		</div>
	);
};
