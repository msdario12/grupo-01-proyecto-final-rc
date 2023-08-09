import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export const TestimonialSection = () => {
	return (
		<>
			<CardGroup className='mb-5'>
				<Card>
					<Card.Img
						variant='top'
						src='https://img.freepik.com/free-photo/confident-handsome-guy-posing-against-white-wall_176420-32936.jpg?w=996&t=st=1691616949~exp=1691617549~hmac=ae11f34f08f53f8cc1e52d822c0cb0b4c45f20182396e63a824551eeab8dfdc5'
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
						src='https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=996&t=st=1691616958~exp=1691617558~hmac=53a01f4cba1e1eb03edfbb902c1e25148ce74ea7106327d4e2b48fcf218b5e47'
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
						src='https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?w=996&t=st=1691616952~exp=1691617552~hmac=be71212d98352ce049eb0bbdec397ca8377cfff949d31338f9154f46c67ad439'
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
