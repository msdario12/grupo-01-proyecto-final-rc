import {
	faCheck,
	faCheckCircle,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	ButtonToolbar,
	Card,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';

const ListItems = ({ children, title }) => {
	const tooltip = <Tooltip id='tooltip'>{children}</Tooltip>;
	return (
		<li className='list-group-item mb-2'>
			<FontAwesomeIcon icon={faCheckCircle} size='lg' />

			<OverlayTrigger overlay={tooltip}>
				<span className='ms-2 me-3'>{title}</span>
			</OverlayTrigger>
		</li>
	);
};

const ComparisonCardsPlans = ({ children, title, description, price }) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title className='display-6 fw-bold'>{title}</Card.Title>
				<Card.Text>
					<p className='fs-6 lh-1'>{description}</p>
				</Card.Text>
				<h2 className='display-6 fw-bold position-relative mb-3'>
					{'$' + price}
					<span className='position-absolute  ms-2 fs-5 text-muted fw-normal'>
						/mes
					</span>
				</h2>
				<ul className='ms-0 ps-0'>{children}</ul>
				<div className='mx-auto'>
					<Button className='w-100' variant='secondary'>
						Adquirir Plan
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export const ComparisonPlans = () => {
	return (
		<section className='row'>
			<div className='col-4'>
				<ComparisonCardsPlans
					title={'Plan Primeros Pasos'}
					description={'Edades: Mascotas de 0 a 5 años.'}
					price='2100'>
					<ListItems title={'Vacunas y refuerzos'}>
						Cobertura completa de las vacunas necesarias para proteger a tu
						mascota en sus primeros años de vida.
					</ListItems>
					<ListItems title={'Desparasitación regular'}>
						Programa de desparasitación que garantiza la salud intestinal de tu
						mascota.
					</ListItems>
					<ListItems title={'Controles de crecimiento'}>
						Evaluaciones periódicas para monitorear el desarrollo y crecimiento
						saludable de tu mascota.
					</ListItems>
					<ListItems title={'Asesoramiento nutricional'}>
						Recomendaciones específicas para una dieta balanceada y adecuada a
						su edad.
					</ListItems>
					<ListItems title={'Identificación y registro'}>
						Incluye la colocación de un microchip para asegurar su
						identificación en caso de extravío.
					</ListItems>
				</ComparisonCardsPlans>
			</div>
			<div className='col-4'>
				<ComparisonCardsPlans
					title={'Plan Madurando'}
					description={'Edades: Mascotas de 5 a 10 años.'}
					price='2100'>
					<ListItems title={'Exámenes médicos completos'}>
						Revisiones regulares para detectar posibles problemas de salud en
						etapas tempranas.
					</ListItems>
					<ListItems title={'Análisis de sangre y orina'}>
						Evaluación del estado de salud interna y detección de enfermedades
						antes de que avancen.
					</ListItems>
					<ListItems title={'Cuidado dental'}>
						Limpieza y cuidado dental para mantener una boca sana y prevenir
						problemas bucales.
					</ListItems>
					<ListItems title={'Manejo de peso'}>
						Asesoramiento y seguimiento para mantener un peso corporal óptimo y
						evitar la obesidad.
					</ListItems>
					<ListItems title={'Terapias preventivas'}>
						Tratamientos para prevenir el desarrollo de enfermedades comunes en
						mascotas maduras.
					</ListItems>
				</ComparisonCardsPlans>
			</div>
			<div className='col-4'>
				<ComparisonCardsPlans
					title={'Plan Adultos'}
					description={'Edades: Mascotas de más de 10 años.'}
					price='2100'>
					<ListItems title={'Geriatría veterinaria'}>
						Atención especializada en el manejo de afecciones propias del
						envejecimiento.
					</ListItems>
					<ListItems title={'Medicamentos para el dolor y la movilidad'}>
						Tratamientos para mejorar la calidad de vida en mascotas de edad
						avanzada.
					</ListItems>
					<ListItems title={'Monitoreo cardíaco y respiratorio'}>
						Evaluación constante de su salud cardiovascular y pulmonar.
					</ListItems>
					<ListItems title={'Adaptaciones en el hogar'}>
						Asesoramiento para hacer ajustes en el entorno que faciliten la
						movilidad de tu mascota.
					</ListItems>
					<ListItems title={'Cuidados paliativos'}>
						Atención compasiva y apoyo emocional en situaciones de salud
						terminal.
					</ListItems>
				</ComparisonCardsPlans>
			</div>
		</section>
	);
};
