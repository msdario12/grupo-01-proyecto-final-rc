import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { MainDashboard } from '../dashboard/pages/MainDashboard';
import { Error404Page } from '../error-404/pages/Error404Page';
import { PatientsDashboard } from '../dashboard/pages/PatientsDashboard';
import { TurnsDashboard } from '../dashboard/pages/TurnsDashboard';
import { MainNavBar } from '../ui/components/MainNavBar';
import { NavbarLayout } from '../ui/pages/NavbarLayout';

export const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route element={<NavbarLayout />}>
						<Route index element={<HomePage />} />
						<Route path='*' element={<Error404Page />} />
					</Route>
					<Route path='/dashboard' element={<MainDashboard />}>
						<Route path='patients' element={<PatientsDashboard />} />
						<Route path='turns' element={<TurnsDashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
