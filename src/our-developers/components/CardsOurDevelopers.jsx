import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const CardsOurDevelopers = () => {
	return (
		<>
			<div className='row d-flex flex-md-row justify-content-center gap-md-5 gap-sm-5 m-0'>
				<Card className='col-12 col-lg-6 p-0 mb-5' style={{ width: '18rem' }}>
					<Card.Img variant='top' src='https://i.ibb.co/BVR0JWH/as.jpg' />
					<Card.Body>
						<Card.Title>Homet Matias</Card.Title>
					</Card.Body>
					<ListGroup className='list-group-flush'>
						<ListGroup.Item>Bueno en Front</ListGroup.Item>
						<ListGroup.Item>Flojo en Backend (Mejorando)</ListGroup.Item>
						<ListGroup.Item>Responsable</ListGroup.Item>
						<ListGroup.Item>Impuntual (Mejorando)</ListGroup.Item>
					</ListGroup>
				</Card>

				<Card className='col-12 col-lg-4 p-0 mb-5' style={{ width: '18rem' }}>
					<Card.Img
						variant='top'
						src='https://i.ibb.co/7Gcrc0w/perfil-dario.jpg'
					/>
					<Card.Body>
						<Card.Title>Dario Mansilla</Card.Title>
					</Card.Body>
					<ListGroup className='list-group-flush'>
						<ListGroup.Item>Bueno en Front</ListGroup.Item>
						<ListGroup.Item>Bueno en Backend</ListGroup.Item>
						<ListGroup.Item>Responsable</ListGroup.Item>
						<ListGroup.Item>Puntual</ListGroup.Item>
					</ListGroup>
				</Card>

				<Card className='col-12 col-lg-4 p-0 mb-5' style={{ width: '18rem' }}>
					<Card.Img
						variant='top'
						src='https://i.ibb.co/v4w7my5/Sin-t-tulo-3.jpg'
					/>
					<Card.Body>
						<Card.Title>Melany Rodriguez</Card.Title>
					</Card.Body>
					<ListGroup className='list-group-flush'>
						<ListGroup.Item>Buena en Front</ListGroup.Item>
						<ListGroup.Item>Floja en Backend (Mejorando)</ListGroup.Item>
						<ListGroup.Item>Responsable</ListGroup.Item>
						<ListGroup.Item>Puntual</ListGroup.Item>
					</ListGroup>
				</Card>
			</div>
		</>
	);
};
