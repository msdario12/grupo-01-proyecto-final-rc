import { Card, Col } from 'react-bootstrap';

export const PatientInfoCard = ({ selectedPatient }) => {
	return (
		<Card className='mb-3'>
			<Card.Body className='row'>
				<Col>
					<div>
						<span className='text-uppercase fw-bold'>nombre: </span>
						<span className='text-capitalize'>{selectedPatient.firstName}</span>
					</div>
					<div>
						<span className='text-uppercase fw-bold'>apellido: </span>
						<span className='text-capitalize'>{selectedPatient.lastName}</span>
					</div>
					<div>
						<span className='text-uppercase fw-bold'>email: </span>
						<span>{selectedPatient.email}</span>
					</div>
				</Col>
				<Col>
					<div>
						<span className='text-uppercase fw-bold'>Mascota: </span>
						<span>{selectedPatient.name}</span>
					</div>
					<div>
						<span className='text-uppercase fw-bold'>Especie: </span>
						<span>{selectedPatient.specie}</span>
					</div>
				</Col>
			</Card.Body>
		</Card>
	);
};
