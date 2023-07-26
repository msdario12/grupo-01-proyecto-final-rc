import {
	faCalendarDay,
	faDog,
	faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const setActiveItem = (state, name) => {
	return state === name ? 'active' : 'text-white';
};

export const SideMenu = () => {
	const [selectItem, setSetselectItem] = useState('home');
	return (
		<div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100'>
			{/* El primero deberia redirigir al home de inicio o el general */}
			<Link
				className='d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'
				to='/dashboard'>
				<span className='fs-4 text-info fw-bold d-none d-md-block '>
					RollingVet
				</span>
				<span className='fs-4 text-info fw-bold d-md-none '>RV</span>
			</Link>

			<hr></hr>
			<ul className='nav nav-pills flex-column mb-auto '>
				<li className='nav-item' onClick={() => setSetselectItem('home')}>
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
				<li className='nav-item' onClick={() => setSetselectItem('patients')}>
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
				<li className='nav-item' onClick={() => setSetselectItem('turns')}>
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
		</div>
	);
};
