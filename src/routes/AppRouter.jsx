import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../home/pages/HomePage';
import { Error404Page } from '../error-404/pages/Error404Page';
import { PatientsDashboardPage } from '../dashboard/patients/pages/PatientsDashboardPage';
import { TurnsDashboard } from '../dashboard/turns/pages/TurnsDashboard';
import { AboutUs } from '../home/pages/About-us';
import { ContactPage } from '../contact/pages/ContactPage';
import { LoginScreen } from '../Login/LoginScreen';
import { DetailPlansPage } from '../plan-details/pages/DetailPlansPage';
import { DashboardLayout } from '../dashboard/ui/DashboardLayout';
import { NavbarLayout } from '../ui/pages/NavbarLayout';
import { RequireAuth } from '../auth/components/RequireAuth';
import { GenericModal } from '../ui/components/GenericModal';
import { OurDevelopers } from '../our-developers/page/OurDevelopers';
import { UnauthorizedPage401 } from '../ui/pages/UnauthorizedPage401';
import { NewTurnPage } from '../dashboard/turns/pages/NewTurnPage';
import { PatientDetailPage } from '../dashboard/patients/pages/PatientDetailPage';
import { NewPatientForm } from '../dashboard/patients/components/NewPatientForm';
import { MainDashboardPage } from '../dashboard/main/pages/MainDashboardPage';
import { TurnReservationPage } from '../turn-reservation/pages/TurnReservationPage';

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
							path='unauthorized-page'
							element={<UnauthorizedPage401 title={'401 - Sin Autorización'} />}
						/>
						<Route
							path='about-us'
							element={<AboutUs title={'Nuestra empresa'} />}
						/>
						<Route
							path='our-developers'
							element={<OurDevelopers title={'Nuestro equipo'} />}
						/>
						<Route path='login' element={<LoginScreen title={'Login'} />} />
						<Route
							path='turn-reservation'
							element={<TurnReservationPage title={'Reserva un turno'} />}
						/>
					</Route>
					{/* Estas rutas son solo para administrador - protegidas */}
					<Route element={<RequireAuth />}>
						<Route path='/dashboard' element={<DashboardLayout />}>
							<Route
								index
								element={<MainDashboardPage title={'Panel administrador'} />}
							/>
							<Route
								path='patients'
								element={<PatientsDashboardPage title={'Pacientes'} />}
							/>
							<Route
								path='turns'
								element={<TurnsDashboard title={'Turnos'} />}
							/>
							<Route
								path='add-patient'
								element={<NewPatientForm title={'Añadir paciente'} />}
							/>
							<Route
								path='add-turn'
								element={<NewTurnPage title={'Añadir paciente'} />}
							/>
							<Route
								path='patient/:id'
								element={<PatientDetailPage title={'Detalles de paciente'} />}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
