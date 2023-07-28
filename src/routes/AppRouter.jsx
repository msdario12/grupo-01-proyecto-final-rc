import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { MainDashboard } from '../dashboard/pages/MainDashboard';
import { Error404Page } from '../error-404/pages/Error404Page';
import { PatientsDashboard } from '../dashboard/pages/PatientsDashboard';
import { TurnsDashboard } from '../dashboard/pages/TurnsDashboard';

import { ContactPage } from '../home/pages/ContactPage';

import { DetailPlansPage } from '../plan-details/pages/DetailPlansPage';
import { DashboardLayout } from '../dashboard/ui/DashboardLayout';
import { NavbarLayout } from '../ui/pages/NavbarLayout';


export const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route element={<NavbarLayout />}>
						<Route index element={<HomePage />} />
						<Route path='*' element={<Error404Page />} />
						<Route path='/detail-plans/:name' element={<DetailPlansPage />} />
						<Route path='*' element={<Error404Page />} />
					</Route>
					<Route path='/dashboard' element={<DashboardLayout />}>
						<Route index element={<MainDashboard />} />
						<Route path='patients' element={<PatientsDashboard />} />
						<Route path='turns' element={<TurnsDashboard />} />
					</Route>

					<Route path='contact' element={<ContactPage />} />

					<Route path='/detail-plans/:name' element={<DetailPlansPage />} />

					<Route path='*' element={<Error404Page />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
