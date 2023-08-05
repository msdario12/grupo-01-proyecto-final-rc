import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SidebarContent } from './SidebarContent';

const setActiveItem = (state, name) => {
	return state === name ? 'active' : 'text-white';
};

export const OffCanvasSideBar = ({ setIsSideBarOpen, isSideBarOpen }) => {
	const [selectItem, setSetselectItem] = useState('home');
	const handleClickMenu = (name) => {
		setSetselectItem(name);
		setIsSideBarOpen(false);
	};
	return (
		<Offcanvas
			className='text-white bg-dark'
			show={isSideBarOpen}
			onHide={setIsSideBarOpen}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>
					<Link
						className='d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'
						to='/dashboard'>
						<span className='fs-4 text-info fw-bold d-none d-md-block '>
							RollingVet
						</span>
						<span className='fs-4 text-info fw-bold d-md-none '>RV</span>
					</Link>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<SidebarContent
					setActiveItem={setActiveItem}
					handleClickMenu={handleClickMenu}
					selectItem={selectItem}
				/>
			</Offcanvas.Body>
		</Offcanvas>
	);
};
