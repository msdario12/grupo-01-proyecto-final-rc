import { Button } from 'react-bootstrap';
import './Hero.css';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
	return (
		<section className='d-flex img-bg min-vh-100'>
			<div className='d-flex container-lg z-3 gap-3 flex-column justify-content-center align-items-start'>
				<h1 className='display-1 fw-bold lh-1 text-light'>
					Bienvenidos a <span className='text-info'>RollingVet</span>
				</h1>
				<h5 className='text-light fw-semibold display-6 lh-1 fs-4'>
					Tu mejor amigo merece el mejor cuidado. Bienvenido a nuestra
					veterinaria, donde el amor por los animales es nuestra pasión.
				</h5>
				<div className='d-flex gap-3'>
					{/* Redirigir hacia una pagina de contacto con el administrador */}
					<Button
						as={Link}
						to={'/turn-reservation'}
						className='btn btn-primary px-4 py-2'>
						Reservar Turno
					</Button>
					{/* Redirigir a una pagina de contacto, con un mapa con ubicación */}
					<Button
						as={Link}
						to={'/about-us'}
						className='btn btn-secondary px-4 py-2'>
						Donde estamos
					</Button>
				</div>
			</div>
		</section>
	);
};
