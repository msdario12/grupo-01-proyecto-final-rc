import { Outlet } from 'react-router';
import { MainNavBar } from '../../ui/components/MainNavBar';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../context/ToastContext';
import { CustomToast } from '../components/CustomToast';
import { OffCanvasSideBar } from '../components/OffCanvasSideBar';
import { SideMenu } from '../components/SideMenu';
import { FooterDashboard } from '../components/Footer-Dashboard';
import { SocketIOContext } from '../../context/SocketIOContext';

export const DashboardLayout = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const [toastStatus, setToastStatus] = useState({
		show: false,
		message: '',
		variant: 'success',
	});
	const { isConnected, events } = useContext(SocketIOContext);
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

	useEffect(() => {
		const lastEvent = events.at(-1);
		if (lastEvent) {
			addToast(lastEvent);
		}
	}, [events]);
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
					<div className='pe-0 d-none d-md-block col-2 col-md-2 col-lg-2 ps-0'>
						<SideMenu
							isSideBarOpen={isSideBarOpen}
							setIsSideBarOpen={setIsSideBarOpen}
						/>
					</div>
					<OffCanvasSideBar
						isSideBarOpen={isSideBarOpen}
						setIsSideBarOpen={setIsSideBarOpen}
					/>
					<div
						className={`px-0 col-12 col-md-10 col-lg-10 d-flex flex-column justify-content-between min-vh-100`}>
						<MainNavBar
							isInDashboard={true}
							setIsSideBarOpen={setIsSideBarOpen}
							isSideBarOpen={isSideBarOpen}
						/>
						<div className='py-1 py-lg-3 container-lg d-flex flex-column gap-3 gap-lg-5'>
							<Outlet />
						</div>
						<CustomToast />
						<FooterDashboard />
					</div>
				</ToastContext.Provider>
			</div>
		</main>
	);
};
