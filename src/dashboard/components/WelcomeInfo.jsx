import { Card, Col, Container, Row } from 'react-bootstrap';

export const WelcomeInfo = () => {
	return (
		<Container className='px-3'>
			<h2 className='display-5 fw-bold lh-1 col-12 mb-4'>
				Bienvenido de vuelta Otto!
			</h2>
			<Row className='row-gap-1 gy-3 gx-4'>
				<Card as={Col} md={6} lg={3} className='text-center'>
					<Card.Body>
						<Card.Title>Nuevos Pacientes</Card.Title>
					</Card.Body>
				</Card>
				<Card as={Col} md={6} lg={3} className='text-center'>
					<Card.Body>
						<Card.Title>Nuevos Pacientes</Card.Title>
					</Card.Body>
				</Card>
				<Card as={Col} md={6} lg={3} className='text-center'>
					<Card.Body>
						<Card.Title>Nuevos Pacientes</Card.Title>
					</Card.Body>
				</Card>
				<Card as={Col} md={6} lg={3} className='text-center'>
					<Card.Body>
						<Card.Title>Nuevos Pacientes</Card.Title>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
};
