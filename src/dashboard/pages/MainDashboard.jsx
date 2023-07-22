import { Outlet } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';

export const MainDashboard = () => {
	return (
		<div>
			<h2>Esto es MainDashboard</h2>
			<h3>Subtitulo</h3>
			<SideMenu />
			<Outlet />
		</div>
	);
};
