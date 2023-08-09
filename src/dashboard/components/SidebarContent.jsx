import {
	faAdd,
	faCalendarDay,
	faDog,
	faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const SidebarContent = ({
	handleClickMenu,
	selectItem,
	setActiveItem,
}) => {
	return (
		<ul className='nav nav-pills flex-column mb-auto '>
			<li className='nav-item' onClick={() => handleClickMenu('home')}>
				<Link
					to={'/dashboard'}
					className={`nav-link d-flex gap-2 justify-content-center justify-content-md-start align-items-center ${setActiveItem(
						selectItem,
						'home'
					)}`}>
					<FontAwesomeIcon icon={faHouse} />
					<span className='d-md-block'>Inicio</span>
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
					<span className='d-md-block'>Pacientes</span>
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
					<span className='d-md-block'>Turnos</span>
				</Link>
			</li>
			<li className='nav-item' onClick={() => handleClickMenu('add-patient')}>
				<Link
					to={'add-patient'}
					className={`nav-link d-flex gap-2 justify-content-center justify-content-md-start align-items-center ${setActiveItem(
						selectItem,
						'add-patient'
					)}`}>
					<FontAwesomeIcon icon={faAdd} />
					<span className='d-md-block'>Crear paciente</span>
				</Link>
			</li>
			<li className='nav-item' onClick={() => handleClickMenu('add-turn')}>
				<Link
					to={'add-turn'}
					className={`nav-link d-flex gap-2 justify-content-center justify-content-md-start align-items-center ${setActiveItem(
						selectItem,
						'add-turn'
					)}`}>
					<FontAwesomeIcon icon={faAdd} />
					<span className='d-md-block'>Crear Turno</span>
				</Link>
			</li>
		</ul>
	);
};
