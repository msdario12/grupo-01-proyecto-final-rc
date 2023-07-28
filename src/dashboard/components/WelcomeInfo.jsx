import { Card } from 'react-bootstrap';

export const WelcomeInfo = () => {
	return (
		<div>
			
			<div className='row gy-3 gx-3'>
				<div className='col-md-4 '>
					<Card className='h-100 border-0 bg-light rounded-0 shadow-sm '>
						<Card.Body className='d-flex flex-column justify-content-between'>
							<div>
								<p className='text-muted fs-6 mb-1 fw-bold'>
									Turnos de hoy - 26/07/23
								</p>
								<hr className='my-1'></hr>
							</div>
							<div className='d-flex gap-2 align-items-center'>
								<h2 className=''>232</h2>
								<span className='text-muted'>Turnos programados</span>
							</div>

							<hr className='my-1'></hr>
							<div className='row gy-3'>
								<div className='col-xl-6 d-flex gap-1 align-items-baseline'>
									<h5>42</h5>
									<span className='text-muted '>Turnos completados</span>
								</div>
								<div className='col-xl-6 d-flex gap-1 align-items-baseline'>
									<h5>156</h5>
									<span className='text-muted'>Turnos pendientes</span>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
				<div className='col-md-4 '>
					<Card className='h-100 border-0 bg-light rounded-0 shadow-sm'>
						<Card.Body className='d-flex flex-column justify-content-between'>
							<div>
								<p className='text-muted fs-6 mb-1 fw-bold'>Próximos turnos</p>
								<hr className='my-1'></hr>
							</div>
							<div className='row my-auto gy-3'>
								<div className='col-6 col-md-12 col-xl-6 d-flex gap-2 align-items-center'>
									<h2 className=''>14:30</h2>
									<div className='d-flex flex-column justify-content-center align-items-end'>
										<span className='text-muted'>Juan Perez</span>
										<span className='text-muted'>"Luna" (Gato)</span>
									</div>
								</div>
								<div className='col-6 col-md-12 col-xl-6 d-flex gap-2 align-items-center'>
									<h2 className=''>15:30</h2>
									<div className='d-flex flex-column justify-content-center align-items-end'>
										<span className='text-muted'>Pedro Sanchez</span>
										<span className='text-muted'>"Estrella" (Gato)</span>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
				<div className='col-md-4 '>
					<Card className='h-100 border-0 bg-light rounded-0 shadow-sm'>
						<Card.Body className='d-flex flex-column justify-content-between'>
							<div>
								<p className=' text-muted fs-6 mb-1 fw-bold'>
									Estadísticas de Atención y Resumen de Mascotas
								</p>
								<hr className='my-1'></hr>
							</div>
							<div className='d-flex gap-2 align-items-center'>
								<span className='text-muted'>
									Mascotas atendidas esta semana:{' '}
								</span>
								<h5 className=''>232</h5>
							</div>
							<div className='d-flex gap-2 align-items-center'>
								<span className='text-muted'>Servicio más común: </span>
								<h5 className=''>Vacunación</h5>
							</div>

							<div className='d-flex gap-2 align-items-center'>
								<span className='text-muted'>
									Total de mascotas registradas:{' '}
								</span>
								<h5 className=''>425</h5>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	);
};
