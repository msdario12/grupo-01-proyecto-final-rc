import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export const TestimonialSection = () => {
	return (
		<>
		
			<h2 className='text-center display-5 fw-bold mb-3'>Testimonios</h2>

			<CardGroup className='mb-5'>
				<Card>
					<Card.Img
						variant='top'
						src='https://imageup.me/images/976a5830-8993-48fc-82e7-8a15ddbfaf0a.jpeg'
					/>
					<Card.Body>
						<Card.Title>Carlos Gonzales</Card.Title>
						<Card.Text>
							Una vez mi perro estuvo a punto de morir por envenamiento. Por
							suerte pude llegar a tiempo a la veterinaria y ellos lo salvaron.
							Muchas gracias.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className='text-muted'>Publicado el 26/06/23</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img
						variant='top'
						src='https://imageup.me/images/5c2e46b7-d21a-4930-a288-16116f545434.jpeg'
					/>
					<Card.Body>
						<Card.Title>Jesica Perez</Card.Title>
						<Card.Text>
							Tienen los mejores productos para el cuidado de tu mascota, muy
							buena atencion. Se los recomiendo mucho, la verdad un espetaculo
							venir aqui.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className='text-muted'>Publicado el 16/07/23</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img
						variant='top'
						src='https://imageup.me/images/fcdd9c4e-602a-4018-bc1d-5d3f22407afc.jpeg'
					/>
					<Card.Body>
						<Card.Title>Eduardo Vallejo</Card.Title>
						<Card.Text>
							Cada vez que llevo a mi perro para que le corten el pelo, vuelve
							bañado y con cortes muy buenos, la verdad muy ingeniosos los
							chicos.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className='text-muted'>Publicado el 28/07/23</small>
					</Card.Footer>
				</Card>
			</CardGroup>
		</>
	);
};
