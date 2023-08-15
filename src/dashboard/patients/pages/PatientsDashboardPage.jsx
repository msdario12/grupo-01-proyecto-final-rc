import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { PatientsTable } from '../components/PatientsTable';

export const PatientsDashboardPage = ({ title }) => {
	useDocumentTitle(title);
	return (
		<>
			<PatientsTable />
		</>
	);
};
