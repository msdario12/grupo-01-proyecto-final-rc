import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { PatientsTable } from '../patients/components/PatientsTable';

export const PatientsDashboard = ({ title }) => {
	useDocumentTitle(title);
	return (
		<>
			<PatientsTable />
		</>
	);
};
