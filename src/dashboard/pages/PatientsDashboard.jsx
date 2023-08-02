import { NewPatientForm } from '../components/NewPatientForm';
import { PatientsTable } from '../components/PatientsTable';

export const PatientsDashboard = () => {
	return (
		<div className='py-1 py-lg-3 container-lg d-flex flex-column gap-3 gap-lg-5'>
			
			<NewPatientForm />
			<PatientsTable />
		</div>
	);
};
