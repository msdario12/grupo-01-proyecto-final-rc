import { NewPatientForm } from '../components/NewPatientForm';
import { PatientsTable } from '../components/PatientsTable';

export const PatientsDashboard = () => {
	return (
		<>
			<NewPatientForm />
			<PatientsTable />
		</>
	);
};
