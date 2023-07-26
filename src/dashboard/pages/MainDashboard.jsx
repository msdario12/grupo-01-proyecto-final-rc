
import { Outlet } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu';
import { MainNavBar } from '../../ui/components/MainNavBar';
import { useState } from 'react';

export const MainDashboard = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);
	return (
		<main className={`container-fluid ${isSideBarOpen && 'ps-0'}`}>
			<div className='row'>
				<div
					className={`min-vh-100 pe-0 ${
						isSideBarOpen ? 'col-2 col-md-3 col-lg-2' : 'd-none'
					}`}>
					<SideMenu />
				</div>
				<div
					className={`px-0 ${
						isSideBarOpen ? 'col-10 col-md-9 col-lg-10' : 'col-12'
					}`}>
					<MainNavBar
						isInDashboard={true}
						setIsSideBarOpen={setIsSideBarOpen}
						isSideBarOpen={isSideBarOpen}
					/>
					<Outlet />
				</div>
			</div>
		</main>

	);
};
