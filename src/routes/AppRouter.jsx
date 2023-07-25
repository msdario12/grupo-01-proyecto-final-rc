import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { MainDashboard } from '../dashboard/pages/MainDashboard';
import { Error404Page } from '../error-404/pages/Error404Page';
import { PatientsDashboard } from '../dashboard/pages/PatientsDashboard';
import { TurnsDashboard } from '../dashboard/pages/TurnsDashboard';
import { DetailPlansPage } from '../plan-details/pages/DetailPlansPage';

export const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/dashboard' element={<MainDashboard />}>
						<Route path='patients' element={<PatientsDashboard />} />
						<Route path='turns' element={<TurnsDashboard />} />
					</Route>
					<Route path='/detail-plans/:name' element={<DetailPlansPage />} />
					<Route path='*' element={<Error404Page />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
