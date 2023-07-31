import { NewPatientForm } from '../components/NewPatientForm';

export const PatientsDashboard = () => {
	return (
		<div className='py-1 py-lg-3 container d-flex flex-column gap-3 gap-lg-5'>
			<div className='mt-1 mt-md-2 mt-lg-4'>
				<h2 style={{ letterSpacing: 0.1 }} className='display-4 fw-bold'>
					Añadir paciente{' '}
				</h2>
				<h4 className='display-6 fs-4'>Busca un email existente o crea uno</h4>
			</div>
			<NewPatientForm />
		</div>
	);
};
