import { MainNavBar } from '../components/MainNavBar';
import { Outlet } from 'react-router-dom';

export const NavbarLayout = () => {
	return (
		<div>
			<MainNavBar />
			<div>
				<Outlet />
			</div>
		</div>
	);
};
