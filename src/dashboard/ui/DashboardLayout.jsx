import { Outlet } from 'react-router';
import { SideMenu } from '../components/SideMenu';
import { MainNavBar } from '../../ui/components/MainNavBar';
import { useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { CustomToast } from '../components/CustomToast';

export const DashboardLayout = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);
	const [toastStatus, setToastStatus] = useState({
		show: false,
		message: '',
		variant: 'success',
	});
	const [toastList, setToastList] = useState([]);
	const addToast = (toast) => {
		const now = new Date();

		setToastList((prev) => [
			...prev,
			{
				...toast,
				date: now.toString(),
				show: true,
			},
		]);
	};
	return (
		<main className={`container-fluid ${isSideBarOpen && 'ps-0'}`}>
			<div className='row'>
				<ToastContext.Provider
					value={{
						status: toastStatus,
						setStatus: setToastStatus,
						setToastList: setToastList,
						addToast: addToast,
						toastList: toastList,
					}}>
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
						<CustomToast />
					</div>
				</ToastContext.Provider>
			</div>
		</main>
	);
};
