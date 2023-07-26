import { Card, Col, Container, Row } from 'react-bootstrap';

export const WelcomeInfo = () => {
	return (
		<div className='container'>
			<h2 className='display-5 fw-bold lh-1 col-12 mb-4'>
				Bienvenido de vuelta Otto!
			</h2>
			<div className='row gy-3 gx-3'>
				<div className='col-auto '>
					<Card className='border-0 bg-light rounded-0 shadow-sm'>
						<Card.Body>
							<p className='text-muted fs-6 mb-1 fw-bold'>
								Turnos de hoy - 26/07/23
							</p>
							<div className='d-flex gap-2 align-items-center'>
								<h2 className=''>232</h2>
								<span className='text-muted'>Turnos programados</span>
							</div>

							<hr className='my-1'></hr>
							<div className='d-flex gap-3'>
								<div className='d-flex gap-1 align-items-baseline'>
									<h5>42</h5>
									<span className='text-muted '>Turnos completados</span>
								</div>
								<div className='d-flex gap-1 align-items-baseline'>
									<h5>156</h5>
									<span className='text-muted'>Turnos pendientes</span>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
				<div className='col-md-6 '>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Nuevos Pacientes</Card.Title>
						</Card.Body>
					</Card>
				</div>
				<div className='col-md-6 '>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Nuevos Pacientes</Card.Title>
						</Card.Body>
					</Card>
				</div>
				<div className='col-md-6 '>
					<Card className='text-center'>
						<Card.Body>
							<Card.Title>Nuevos Pacientes</Card.Title>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	);
};
