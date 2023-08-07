import { Footer } from '../../home/components/Footer';
import { MainNavBar } from '../components/MainNavBar';
import { Outlet } from 'react-router-dom';

export const NavbarLayout = () => {
	return (
		<div className='d-flex flex-column justify-content-between min-vh-100'>
			<MainNavBar />
			<div className='my-auto container-lg'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
