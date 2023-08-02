import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarContent } from './SidebarContent';

const setActiveItem = (state, name) => {
	return state === name ? 'active' : 'text-white';
};

export const SideMenu = ({ setIsSideBarOpen }) => {
	const [selectItem, setSetselectItem] = useState('home');
	const handleClickMenu = (name) => {
		setSetselectItem(name);
		setIsSideBarOpen(false);
	};
	return (
		<div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 min-vh-100'>
			{/* El primero deberia redirigir al home de inicio o el general */}
			<div className='sticky-top'>
				<Link
					className='d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'
					to='/dashboard'>
					<span className='fs-4 text-info fw-bold d-none d-lg-block '>
						RollingVet
					</span>
					<span className='fs-4 text-info fw-bold d-lg-none '>RV</span>
				</Link>

				<hr></hr>
				<SidebarContent
					setActiveItem={setActiveItem}
					handleClickMenu={handleClickMenu}
					selectItem={selectItem}
				/>
			</div>
		</div>
	);
};
