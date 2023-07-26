
import { Outlet } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';
import { MainNavBar } from '../../ui/components/MainNavBar';

export const MainDashboard = () => {
	return (
		<main className='container-fluid ps-0 '>
			<div className='row'>
				<div className='col-4 min-vh-100 pe-0'>
					<SideMenu />
				</div>
				<div className='col-8 px-0'>
					<MainNavBar isInDashboard={true} />
					<Outlet />
				</div>
			</div>
		</main>

	);
};
