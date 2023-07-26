import { Outlet } from 'react-router';
import { SideMenu } from '../components/SideMenu';

export const DashboardLayout = () => {
	return (
		<main className='container-fluid ps-0 '>
			<div className='row'>
				<div className='col-3 min-vh-100'>
					<SideMenu />
				</div>
				<div className='col-9'>
					<Outlet />
				</div>
			</div>
		</main>
	);
};
