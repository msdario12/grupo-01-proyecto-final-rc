import { Footer } from '../../home/components/Footer';
import { MainNavBar } from '../components/MainNavBar';
import { Outlet } from 'react-router-dom';

export const NavbarLayout = () => {
	return (
		<div className='d-flex flex-column justify-content-bwtween min-vh-100'>
			<MainNavBar />
			<div>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
