import {
	faCalendarDay,
	faDog,
	faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const setActiveItem = (state, name) => {
	return state === name ? 'active' : 'text-white';
};

export const SideMenu = () => {
	const [selectItem, setSetselectItem] = useState('home');
	return (
		<div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark w-25'>
			<a
				className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'
				href='#'>
				<span className='fs-4'>RollingVet</span>
			</a>
			<hr></hr>
			<ul className='nav nav-pills flex-column mb-auto'>
				<li className='nav-item' onClick={() => setSetselectItem('home')}>
					<a
						href='#'
						className={`nav-link d-flex gap-2 align-items-center ${setActiveItem(
							selectItem,
							'home'
						)}`}>
						<FontAwesomeIcon icon={faHouse} />
						Inicio
					</a>
				</li>
				<li className='nav-item' onClick={() => setSetselectItem('pacients')}>
					<a
						href='#'
						className={`nav-link d-flex gap-2 align-items-center ${setActiveItem(
							selectItem,
							'pacients'
						)}`}>
						<FontAwesomeIcon icon={faDog} />
						Pacientes
					</a>
				</li>
				<li className='nav-item'>
					<a
						href='#'
						className='nav-link text-white d-flex gap-2 align-items-center'>
						<FontAwesomeIcon icon={faCalendarDay} />
						Turnos
					</a>
				</li>
			</ul>
		</div>
	);
};
