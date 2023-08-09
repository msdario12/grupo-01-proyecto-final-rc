import { useEffect, useState } from 'react';
import { Footer } from '../../home/components/Footer';
import { MainNavBar } from '../components/MainNavBar';
import { Outlet, useLocation } from 'react-router-dom';

export const NavbarLayout = () => {
	const location = useLocation();
	const [isHome, setIsHome] = useState(false);

	useEffect(() => {
		if (location.pathname === '/') {
			setIsHome(true);
		}
	}, [location]);

	return (
		<div className='d-flex flex-column justify-content-between min-vh-100'>
			<MainNavBar />
			<div className={'my-auto ' + isHome ? '' : 'container-lg'}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
