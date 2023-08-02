import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { MainDashboard } from '../dashboard/pages/MainDashboard';
import { Error404Page } from '../error-404/pages/Error404Page';
import { PatientsDashboard } from '../dashboard/pages/PatientsDashboard';
import { TurnsDashboard } from '../dashboard/pages/TurnsDashboard';
import { AboutUs } from '../home/pages/About-us';

import { ContactPage } from '../contact/pages/ContactPage';

import { DetailPlansPage } from '../plan-details/pages/DetailPlansPage';
import { DashboardLayout } from '../dashboard/ui/DashboardLayout';
import { NavbarLayout } from '../ui/pages/NavbarLayout';
import { NewPatientForm } from '../dashboard/components/NewPatientForm';
import { RequireAuth } from '../auth/components/RequireAuth';
import { GenericModal } from '../ui/components/GenericModal';

export const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* Estas rutas son públicas */}
					<Route element={<NavbarLayout />}>
						<Route index element={<HomePage title={'Home'} />} />
						<Route path='contact' element={<ContactPage />} />
						<Route path='/detail-plans/:name' element={<DetailPlansPage />} />
						<Route path='*' element={<Error404Page />} />
						<Route path='about-us' element={<AboutUs />} />
					</Route>
					{/* Estas rutas son solo para administrador - protegidas */}
					<Route element={<RequireAuth />}>
						<Route path='/dashboard' element={<DashboardLayout />}>
							<Route index element={<MainDashboard />} />
							<Route path='patients' element={<PatientsDashboard />} />
							<Route path='turns' element={<TurnsDashboard />} />
							<Route path='add-patient' element={<NewPatientForm />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
