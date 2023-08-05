import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { MainDashboard } from '../dashboard/pages/MainDashboard';
import { Error404Page } from '../error-404/pages/Error404Page';
import { PatientsDashboard } from '../dashboard/pages/PatientsDashboard';
import { TurnsDashboard } from '../dashboard/pages/TurnsDashboard';
import { AboutUs } from '../home/pages/About-us';
import { ContactPage } from '../contact/pages/ContactPage';
import { LoginScreen } from '../Login/LoginScreen';
import { DetailPlansPage } from '../plan-details/pages/DetailPlansPage';
import { DashboardLayout } from '../dashboard/ui/DashboardLayout';
import { NavbarLayout } from '../ui/pages/NavbarLayout';
import { NewPatientForm } from '../dashboard/components/NewPatientForm';
import { RequireAuth } from '../auth/components/RequireAuth';
import { GenericModal } from '../ui/components/GenericModal';
import { OurDevelopers } from '../our-developers/page/OurDevelopers';

export const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<GenericModal />
				<Routes>
					{/* Estas rutas son públicas */}
					<Route element={<NavbarLayout />}>
						<Route index element={<HomePage title={'Home'} />} />
						<Route
							path='contact'
							element={<ContactPage title={'Contáctenos'} />}
						/>
						<Route
							path='/detail-plans/:name'
							element={<DetailPlansPage title={'Nuestros planes'} />}
						/>
						<Route
							path='*'
							element={<Error404Page title={'Pagina no encontrada'} />}
						/>
						<Route
							path='about-us'
							element={<AboutUs title={'Nuestra empresa'} />}
						/>
						<Route
							path='our-developers'
							element={<OurDevelopers title={'Nuestro equipo'} />}
						/>
						<Route path='login' element={<LoginScreen />} />
					</Route>
					{/* Estas rutas son solo para administrador - protegidas */}
					<Route element={<RequireAuth />}>
						<Route path='/dashboard' element={<DashboardLayout />}>
							<Route
								index
								element={<MainDashboard title={'Panel administrador'} />}
							/>
							<Route
								path='patients'
								element={<PatientsDashboard title={'Pacientes'} />}
							/>
							<Route
								path='turns'
								element={<TurnsDashboard title={'Turnos'} />}
							/>
							<Route
								path='add-patient'
								element={<NewPatientForm title={'Añadir paciente'} />}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
