import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { MainDashboard } from '../dashboard/pages/MainDashboard';
import { Error404Page } from '../error-404/pages/Error404Page';

export const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/dashboard' element={<MainDashboard />} />
					<Route path='*' element={<Error404Page />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};
