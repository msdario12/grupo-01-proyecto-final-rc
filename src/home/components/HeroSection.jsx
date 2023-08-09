import './Hero.css';

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
					<button className='btn btn-primary px-4 py-2'>Reservar Turno</button>
					{/* Redirigir a una pagina de contacto, con un mapa con ubicación */}
					<button className='btn btn-secondary px-4 py-2'>Donde estamos</button>
				</div>
			</div>

			{/* <img
					className='img-fluid'
					src='https://images.unsplash.com/photo-1521247560470-d2cbfe2f7b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
					alt='Imagen principal de una veterinaria'
				/> */}
		</section>
	);
};
