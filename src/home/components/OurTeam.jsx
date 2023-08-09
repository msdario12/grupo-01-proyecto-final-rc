import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ourTeamContent = [
	{
		fullName: 'Álvaro Juárez',
		position: 'Veterinario Principal',
		src: 'https://faunatikos.com.ar/wp-content/uploads/2021/08/WhatsApp-Image-2021-07-23-at-14.07.33-e1628675871529-400x400.jpeg',
		description:
			'Con 5 años en la clínica, brinda atención experta y cuidado a cada paciente.',
	},
	{
		fullName: 'Ana Lucia Álvarez',
		position: 'Asistente de Consultorio',
		src: 'https://faunatikos.com.ar/wp-content/uploads/2021/07/Natalia-1-e1627391498565-200x200.jpg',
		description:
			'Apoya a los veterinarios en la atención diaria, asegurando un servicio de calidad.',
	},
	{
		fullName: 'María Rodriguez',
		position: 'Veterinario de guardia',
		src: 'https://faunatikos.com.ar/wp-content/uploads/2021/07/Daniela-2-e1627391593928-200x200.jpg',
		description:
			'Ayuda a los dueños de mascotas a elegir las dietas adecuadas para sus compañeros peludos.',
	},
];

export const OurTeam = () => {
	return (
		<div className='row gap-3 d-flex justify-content-center'>
			{ourTeamContent.map((vet) => (
				<Card key={vet.name} style={{ width: 300 }}>
					<Card.Body className='d-flex flex-column gap-3 align-items-center justify-content-between'>
						<img
							style={{ height: 175 }}
							className='object-fit-cover w-75 rounded-circle'
							src={vet.src}
							alt='Imagen del personal de la veterinaria'
						/>
						<div className='text-center'>
							<h2 className='fw-bold fs-2'>{vet.fullName}</h2>
							<h4
								style={{ letterSpacing: 0.4 }}
								className='text-muted text-uppercase fw-bold'>
								{vet.position}
							</h4>
						</div>
						<div className='text-center'>
							<p className='lh-base text-start'>{vet.description}</p>
						</div>
						<div className='d-flex gap-3 justify-content-center'>
							<Link to={'/twitter'}>
								<FontAwesomeIcon icon={faTwitter} size='2xl' />
							</Link>
							<Link to={'/twitter'}>
								<FontAwesomeIcon icon={faLinkedin} size='2xl' />
							</Link>
						</div>
					</Card.Body>
				</Card>
			))}
		</div>
	);
};
