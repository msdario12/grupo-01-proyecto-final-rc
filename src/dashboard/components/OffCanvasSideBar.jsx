import {
	faCalendarDay,
	faDog,
	faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
				<ul className='nav nav-pills flex-column mb-auto '>
					<li className='nav-item' onClick={() => handleClickMenu('home')}>
						<Link
							to={'/dashboard'}
							className={`nav-link d-flex gap-2 justify-content-center justify-content-md-start align-items-center ${setActiveItem(
								selectItem,
								'home'
							)}`}>
							<FontAwesomeIcon icon={faHouse} />
							<span className='d-none d-md-block'>Inicio</span>
						</Link>
					</li>
					<li className='nav-item' onClick={() => handleClickMenu('patients')}>
						<Link
							to={'patients'}
							className={`nav-link d-flex gap-2 justify-content-center justify-content-md-start align-items-center ${setActiveItem(
								selectItem,
								'patients'
							)}`}>
							<FontAwesomeIcon icon={faDog} />
							<span className='d-none d-md-block'>Pacientes</span>
						</Link>
					</li>
					<li className='nav-item' onClick={() => handleClickMenu('turns')}>
						<Link
							to={'turns'}
							className={`nav-link d-flex gap-2 justify-content-center justify-content-md-start align-items-center ${setActiveItem(
								selectItem,
								'turns'
							)}`}>
							<FontAwesomeIcon icon={faCalendarDay} />
							<span className='d-none d-md-block'>Turnos</span>
						</Link>
					</li>
				</ul>
			</Offcanvas.Body>
		</Offcanvas>
	);
};
